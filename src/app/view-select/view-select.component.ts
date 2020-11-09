import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../quiz-service.service';

@Component({
  selector: 'view-select',
  templateUrl: './view-select.component.html',
  styleUrls: ['./view-select.component.css']
})
export class ViewSelectComponent implements OnInit {

  //Each string is representative of a bool for css display. true="visible", false="hidden"
  quizViewIsVisible: string; //Is the Quiz View Visible?
  reviewViewIsVisible: string; //Is the Review View Visible?
  resultViewIsVisible: string; //Is the Results View Visible?

  //Each string is representative of a bool for css display. true="enabled", false="disabled"; can hide buttons with "hidden when on submit view"
  quizButtonIsActive: string; //If false, cannot click quiz button
  reviewButtonIsActive: string; //If true, cannot click review button
  resultButtonIsActive: string; //If true, cannot click review button

  //When view first starts
  constructor(private quizService: QuizServiceService) {
    this.quizViewIsVisible = "visible";
    this.reviewViewIsVisible = "hidden";
    this.resultViewIsVisible = "hidden";

    this.quizButtonIsActive = "disabled";
    this.reviewButtonIsActive = "enabled";
    this.resultButtonIsActive = "enabled";
  }

  ngOnInit(): void {
  }

  //ViewSelect functions
  ShowQuizView() {
    this.quizViewIsVisible = "visible";
    this.reviewViewIsVisible = "hidden";

    this.quizButtonIsActive = "disabled";
    this.reviewButtonIsActive = "enabled";
  }
  ShowReviewView() {
    this.quizViewIsVisible = "hidden";
    this.reviewViewIsVisible = "visible";

    this.quizButtonIsActive = "enabled";
    this.reviewButtonIsActive = "disabled";
  }
  ShowResultView() {
    //Confirm submission (different message if not all answers are answered)
    let msg="";
    if (this.quizService.getNumOfAnswered() < this.quizService.getNumOfQuestions()) 
      msg = "Warning: Not all questions are finished. Are you sure you want to submit your test?";
    else 
      msg = "Are you sure you want to submit your test?";
      if (!confirm(msg))
        return;
    
      //Only do this if confirmed
      this.quizViewIsVisible = "hidden";
      this.reviewViewIsVisible = "hidden";
      this.resultViewIsVisible = "visible";

      this.quizButtonIsActive = "hidden";
      this.reviewButtonIsActive = "hidden";
      this.resultButtonIsActive = "hidden";
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
  }

