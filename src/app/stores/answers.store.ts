import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnswerStore {
  private innerAnswers$ = new BehaviorSubject<
    Record<number, string | string[]>
  >({});

  public getAnswers(): Observable<AnswerModel> {
    return this.innerAnswers$.asObservable();
  }

  public addAnswer(questionId: number, answer: string | string[]): void {
    this.innerAnswers$.next({
      ...this.innerAnswers$.value,
      [questionId]: answer,
    });
  }
}
