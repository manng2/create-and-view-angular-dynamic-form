import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, map, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';
import { FormAddQuestionComponent } from '../form-add-question/form-add-question.component';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderComponent implements OnInit, OnDestroy {
  private readonly complete$ = new Subject<void>();
  private readonly innerQuestions$ = new ReplaySubject<QuestionModel[]>(1);

  public questions$ = this.innerQuestions$.asObservable();

  public constructor(
    private dialog: MatDialog,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.questionService
      .getQuestions()
      .pipe(takeUntil(this.complete$))
      .subscribe({
        next: (v) => {
          this.innerQuestions$.next(v);
        },
      });
  }

  public ngOnDestroy(): void {
    this.complete$.next();
  }

  public openAddQuestionModal(): void {
    this.dialog
      .open(FormAddQuestionComponent)
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe({
        next: (question) => {
          this.questionService.addQuestion({
            id: Date.now(),
            ...question,
          });
        },
      });
  }

  public onUpdateAnswer({
    questionId,
    answer,
  }: {
    questionId: number;
    answer: string | string[];
  }): void {
    this.answerService.addAnswer(questionId, answer);
  }

  public navigateToReviewAnswers(): void {
    this.router.navigate(['form', 'answer']);
  }
}
