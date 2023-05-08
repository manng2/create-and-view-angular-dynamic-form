import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, ReplaySubject, take } from 'rxjs';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.sass'],
})
export class AnswerComponent implements OnInit {
  private readonly innerViewAnswers$ = new ReplaySubject<ViewAnswerModel[]>(1);

  public viewAnswers$ = this.innerViewAnswers$.asObservable();

  public constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    combineLatest([
      this.questionService.getQuestions(),
      this.answerService.getAnswers(),
    ])
      .pipe(take(1))
      .subscribe({
        next: ([questions, answers]) => {
          const result = questions.map((it) => ({
            question: it.question,
            isCheckbox: it.type === 'checkbox',
            answer: answers[it.id] as string,
            answers: answers[it.id] as string[],
          }));

          console.log(result);

          this.innerViewAnswers$.next(result);
        },
      });
  }

  public navigateToBuilder(): void {
    this.router.navigate(['form', 'builder']);
  }
}
