import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../quiz-service.service';
import { Answer, Question } from '../quiz_structure';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private quizService: QuizServiceService) {
  }

  ngOnInit(): void {
  }

  //Result View functions
  getStatus() {
    if (this.quizService.getScore() > (this.quizService.getNumOfQuestions() * .60))
      return "Passed!";
    else
      return "Failed";
  }
  answerColor(answer: Answer) { //Neutral is left alone. Red if incorrectly chosen, Green if correctly chosen.
    //If correct and selected, correct
    if (answer.checkIfSelected() && answer.checkIfCorrect()) {
      return "Correct";
    }
    //If selected and !correct, incorrect
    else if (answer.checkIfSelected())
      return "incorrectStrike";
    else
      return "";
  }

  correctStatus(question: Question) {
    if (question.checkIfUserCorrect())
      return "Correct";
    else return "Incorrect";
  }

  //Quiz Service Wrapper Functions
  getQuizName() { return this.quizService.getQuizName(); }
  getNumOfAnswered() { return this.quizService.getNumOfAnswered(); }
  getNumOfMarkedForReview() { return this.quizService.getNumOfMarkedForReview(); }
  getNumOfQuestions() { return this.quizService.getNumOfQuestions(); }
  getScore() { return this.quizService.getScore(); }
  getScoreFraction() { return this.quizService.getScoreFraction(); }
  getCurrentTime() { return this.quizService.getCurrentTime(); }
  getTotalTime() { return this.quizService.getTotalTime(); }
  getQuestion(index: number) { return this.quizService.getQuestion(index); }
  getQuestions() { return this.quizService.getQuestions(); }
  getQuestionNum(question: Question) { return this.quizService.getQuestionNum(question); }
}
