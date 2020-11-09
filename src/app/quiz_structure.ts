import Quiz1 from '../assets/Quiz1.json';

export class Answer {
    private answerText: string; //The Answer
    private correct: boolean; //Is this answer correct?
    private selected: boolean; //Did the user select this answer?
    private ansButtonClass: string; //The css class of the button (to change colors)

    constructor(answerText: string, correct: boolean) {
        this.answerText = answerText;
        this.correct = correct;
        this.selected = false; //Always start as unselected
        this.ansButtonClass = 'btn-light';
    }
    getAnswerText() { return this.answerText ;}
    getButtonColor() { return this.ansButtonClass ;}

    checkIfCorrect() { return this.correct; }
    checkIfSelected() { return this.selected; }

    toggleSelect() {
        this.selected = !this.selected;
        if (this.selected) this.ansButtonClass = 'btn-primary'
        else this.ansButtonClass = 'btn-light';
    }
    select() {
        this.selected = true; this.ansButtonClass = 'btn-primary';
    }
    deselect() {
        this.selected = false; this.ansButtonClass = 'btn-light';
    }
}

export class Question {
    private questionText: string; //The Question
    private answered: boolean; //Is at least one answer of this question selected?
    private markedForReview: boolean; //Override answered bool; did user mark for review
    private numOfAnswers: number; //Number of answers in list
    private answers: Answer[]; //List of all answers
    private quesButtonClass: string; //The css class of the button (to change colors)


    constructor(questionText: string, answers: Answer[]) {
        this.questionText = questionText;
        this.answers = answers; //parsed from JSON
        this.numOfAnswers = this.answers.length;
        this.answered = false; //Question should start unanswered
        this.markedForReview = false; //Question should start unmarked
        this.quesButtonClass = "btn-dark" //Question should start unanswered
    }

    getQuestionText() { return this.questionText; }
    getButtonColor() {return this.quesButtonClass;}
    getNumOfAnswers() { return this.numOfAnswers; }
    checkIfAnswered() { return this.answered; }
    checkIfMarkedForReview() { return this.markedForReview; }

    SetAnswered() {
        for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i].checkIfSelected()) {
                this.answered = true;
                if (!this.checkIfMarkedForReview()) //Turn blue if not marked for review
                    this.quesButtonClass="btn-success";
                return true;
            };
        }
        this.answered = false;
        return false;
    }

    markAnswered() { this.answered = true; }
    markUnanswered() { this.answered = false }
    toggleMarkedForReview() { 
        this.markedForReview = !this.markedForReview;
        if (this.markedForReview){
            this.quesButtonClass="btn-purple";
        }
        else if (this.checkIfAnswered())
        {this.quesButtonClass="btn-success";}
        else
        this.quesButtonClass="btn-dark";
     }

    getAnswer(index: number) {
        if (index > this.answers.length - 1 || index < 0)
            console.log("Error: cannot get answer.");
        else return this.answers[index];
    }
    getAnswers() { return this.answers; }

    selectAnswer(answer: Answer) {

        //Disable all
        for (let i = 0; i < this.answers.length; i++) {
            this.answers[i].deselect();
        }
        //Then toggleSelect index given (bug: just selects)
        answer.toggleSelect();
        //Check if questions is answered
        this.SetAnswered();

    }

    checkIfUserCorrect() {
        if (!this.answered) return false;
        else {
            for (let i of this.answers) {
                if (i.checkIfCorrect() && i.checkIfSelected()) return true;
            }
         return false; //If none are true, user is incorrect
        }
    }

}

export class Quiz {
    private quizName: string; //Name of the quiz
    private numOfAnswered: number; //Number of questions answered
    private numOfMarkedForReview; //Number of questions marked for Review
    private numOfQuestions: number; //Number of Total Questions
    private score: number; //Number of Correct Questions
    private currentTime: number; //time elapsed in seconds
    private totalTime: number; //total time allowed in seconds
    private questions: Question[]; //List of questions

    constructor() {
        //Get other properties
        this.quizName = Quiz1.quizName;
        this.numOfAnswered = 0;
        this.numOfMarkedForReview = 0;
        this.numOfQuestions = Quiz1.questions.length;
        this.score = 0;
        this.currentTime = 0;
        this.totalTime = Quiz1.timeLimit;
        this.questions = new Array();

        //Populate Questions
        for (let i = 0; i < this.numOfQuestions; i++) {
            //Make list of answers
            let answers: Answer[] = new Array();
            for (let j = 0; j < Quiz1.questions[i].answers.length; j++) {
                let a: Answer = new Answer(
                    Quiz1.questions[i].answers[j].answerText,
                    Quiz1.questions[i].answers[j].isCorrect
                );
                answers[j] = a;
            }
            //Make question with list of answers
            let q: Question = new Question(
                Quiz1.questions[i].questionText,
                answers
            );
            this.questions[i] = q;
        }
    }
    getQuizName() { return this.quizName; }
    getNumOfAnswered() {
        this.numOfAnswered = 0;
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].checkIfAnswered())
                this.numOfAnswered++;
        }
        return this.numOfAnswered;
    }
    getNumOfMarkedForReview() {
        this.numOfMarkedForReview = 0;
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].checkIfMarkedForReview())
                this.numOfMarkedForReview++;
        }
        return this.numOfMarkedForReview;
    }
    getNumOfQuestions() { return this.numOfQuestions; }
    getScore() {
        this.score = 0;
        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].checkIfUserCorrect()) {
                this.score++;
            }
        }
        return this.score;
    }
    getScoreFraction() { return this.getScore() + "/" + this.numOfQuestions }
    getCurrentTime() { return this.currentTime; }
    getTotalTime() { return this.totalTime; }

    getQuestion(index: number) {
        if (index > this.questions.length - 1 || index < 0)
            console.log("Error: Cannot get question.");
        else return this.questions[index];
    }
    getQuestions() { return this.questions; }
    getQuestionNum(question) {
        for (let i = 0; i < this.questions.length; i++) {
            if (question == this.questions[i]) return i;
        }
        console.log("Question not found. This should not happen.");
    }
}