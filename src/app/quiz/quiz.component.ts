import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../quiz-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private quizService: QuizServiceService) { //This will give the service copy of the quiz obj
  }

  ngOnInit(): void {
  }

  //Quiz View Functions
  getIndex(): number { return this.quizService.getIndex(); }
  setIndex(index: number) { this.quizService.setIndex(index);}

  ifMarkedForReview() {
    if (this.quizService.getQuestion(this.quizService.getIndex()).checkIfMarkedForReview())
      return "Marked For Review";
    else
      return "";
  }

  first() { this.quizService.setIndex(0) };
  prev() { if (this.quizService.getIndex() > 0) this.quizService.decrementIndex(); }
  next() { if (this.quizService.getIndex() < this.quizService.getNumOfQuestions() - 1) this.quizService.incrementIndex(); }
  last() { this.quizService.setIndex(this.quizService.getNumOfQuestions() - 1) }

  //Quiz Service Wrapper Functions
  getQuizName() { return this.quizService.getQuizName(); }
  getNumOfAnswered() { return this.quizService.getNumOfAnswered(); }
  getNumOfMarkedForReview() { return this.quizService.getNumOfMarkedForReview(); }
  getNumOfQuestions() { return this.quizService.getNumOfQuestions(); }
  getCurrentTime() { return this.quizService.getCurrentTime(); }
  getTotalTime() { return this.quizService.getTotalTime(); }
  getQuestion(index: number) { return this.quizService.getQuestion(index); }
}

