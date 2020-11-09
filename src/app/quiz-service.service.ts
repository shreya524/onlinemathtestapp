import { Injectable } from '@angular/core';

import { Quiz } from './quiz_structure';

//Provides quiz to all components in angular that ask for it.

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService extends Quiz {

  private index: number; //The current question the user is on

  constructor() {
    super();
    this.index = 0;
  }
  //This should now have all of the functions of the Quiz object
  getIndex() { return this.index; }
  setIndex(newIndex: number) { this.index = newIndex; }
  incrementIndex() { this.index++;}
  decrementIndex() { this.index--;}

}
