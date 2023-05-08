import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsStore {
  private innerQuestions$ = new BehaviorSubject<QuestionModel[]>([]);

  public getQuestions(): Observable<QuestionModel[]> {
    return this.innerQuestions$.asObservable();
  }

  public addQuestion(question: QuestionModel): void {
    this.innerQuestions$.next([...this.innerQuestions$.value, question]);
  }
}
