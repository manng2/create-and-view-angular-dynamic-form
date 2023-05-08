import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerStore } from '../stores/answers.store';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  public constructor(private answerStore: AnswerStore) {}

  public getAnswers(): Observable<AnswerModel> {
    return this.answerStore.getAnswers();
  }

  public addAnswer(questionId: number, answer: string | string[]): void {
    this.answerStore.addAnswer(questionId, answer);
  }
}
