import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { debounceTime, map, ReplaySubject, startWith } from 'rxjs';
import { AnswerService } from 'src/app/services/answer.service';

@Component({
  selector: 'app-dynamic-question',
  templateUrl: './dynamic-question.component.html',
  styleUrls: ['./dynamic-question.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicQuestionComponent implements OnInit {
  private readonly innerIsShownOtherInput$ = new ReplaySubject<boolean>(1);

  public isShownOtherInput$ = this.innerIsShownOtherInput$.pipe(
    startWith(false)
  );
  public otherFormControl?: FormControl;
  public formControl!: FormControl;

  @Input() question!: QuestionModel;
  @Output() update: EventEmitter<{
    questionId: number;
    answer: string | string[];
  }> = new EventEmitter();

  public ngOnInit(): void {
    if (this.question.type === 'checkbox') {
      this.formControl = new FormControl([]);

      if (this.question.isAllowedSpecifyAnswer) {
        this.otherFormControl = new FormControl('');

        this.otherFormControl.valueChanges.pipe(debounceTime(300)).subscribe({
          next: (value) => {
            this.formControl.setValue([...this.formControl.value, value]);
          },
        });
      }
    } else {
      this.formControl = new FormControl('');
    }

    this.formControl.valueChanges.subscribe({
      next: (value) => {
        this.update.emit({
          questionId: this.question.id,
          answer: value,
        });
      },
    });
  }

  public onHandleCheckbox(e: MatCheckboxChange, isOther = false): void {
    const { checked, source } = e;

    if (checked) {
      if (isOther) {
        this.innerIsShownOtherInput$.next(true);
      } else {
        this.formControl.setValue([...this.formControl.value, source.value]);
      }
    } else {
      if (isOther) {
        this.innerIsShownOtherInput$.next(false);

        this.formControl.setValue(
          (this.formControl.value as string[]).filter(
            (it) => it !== this.otherFormControl?.value
          )
        );
      } else {
        this.formControl.setValue(
          (this.formControl.value as string[]).filter(
            (it) => it !== source.value
          )
        );
      }
    }
  }
}
