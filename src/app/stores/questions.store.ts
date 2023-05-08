import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsStore {
  private innerQuestions$ = new BehaviorSubject<QuestionModel[]>([
    {
      type: 'paragraph',
      question: 'Hello',
      isAllowedSpecifyAnswer: true,
      isRequired: true,
      id: 1,
    },
    {
      type: 'checkbox',
      question: 'Checkbox',
      answers: ['Man', 'Nguyen'],
      isAllowedSpecifyAnswer: true,
      isRequired: true,
      id: 2,
    },
  ]);

  public getQuestions(): Observable<QuestionModel[]> {
    return this.innerQuestions$.asObservable();
  }

  public addQuestion(question: QuestionModel): void {
    this.innerQuestions$.next([...this.innerQuestions$.value, question]);
  }
}
