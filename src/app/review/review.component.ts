import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../quiz-service.service';
import { Question } from '../quiz_structure';
import { ViewSelectComponent } from '../view-select/view-select.component'


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(private quizService: QuizServiceService,    private viewSelect: ViewSelectComponent,) {
  }

  ngOnInit(): void {
  }

  //Review View functions
  getIfQuestionTouched(question: Question) { //Answered or Marked
    if (question.checkIfMarkedForReview())
      return "Marked for Review";
    else if (question.checkIfAnswered()) {
      return "Answered";
    }
    else
      return "Not Answered";
  }
  getQuestionColor(question:Question) {return question.getButtonColor();}

  //Quiz Service Wrapper Functions
  getQuizName() { return this.quizService.getQuizName(); }
  getNumOfAnswered() { return this.quizService.getNumOfAnswered(); }
  getNumOfMarkedForReview() { return this.quizService.getNumOfMarkedForReview(); }
  getNumOfQuestions() { return this.quizService.getNumOfQuestions(); }
  getCurrentTime() { return this.quizService.getCurrentTime(); }
  getTotalTime() { return this.quizService.getTotalTime(); }
  getQuestion(index: number) { return this.quizService.getQuestion(index); }
  getQuestions() { return this.quizService.getQuestions(); }
  getQuestionNum(question: Question) { return this.quizService.getQuestionNum(question); }

  //Click on button to go to the quiz view at that question.
  GoToQuestion(index:number) {
    this.quizService.setIndex(index);
      this.viewSelect.ShowQuizView();
  }
}
