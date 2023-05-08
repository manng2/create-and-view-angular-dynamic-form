import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { QuestionsStore } from '../stores/questions.store';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  public constructor(private questionsStore: QuestionsStore) {}

  public getQuestions(): Observable<QuestionModel[]> {
    return this.questionsStore.getQuestions();
  }

  public addQuestion(question: QuestionModel): void {
    this.questionsStore.addQuestion(question);
  }
}
