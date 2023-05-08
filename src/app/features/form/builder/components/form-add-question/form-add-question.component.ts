import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-add-question',
  templateUrl: './form-add-question.component.html',
  styleUrls: ['./form-add-question.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAddQuestionComponent implements OnInit {
  public formGroup = new FormGroup({
    type: new FormControl('checkbox'),
    question: new FormControl('', Validators.required),
    answers: new FormArray([new FormControl('')]),
    isAllowedSpecifyAnswer: new FormControl(false),
    isRequired: new FormControl(true),
  });

  get answerFormArray(): FormArray {
    return this.formGroup.controls.answers;
  }

  public constructor(
    private dialogRef: MatDialogRef<FormAddQuestionComponent>
  ) {}

  public ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(console.log);
    // this.formGroup.controls.type.valueChanges.subscribe({
    //   next: () => {

    //   }
    // })
  }

  public addNewAnswer(): void {
    if (this.answerFormArray.length === 5) {
      return;
    }

    this.formGroup.controls.answers.push(new FormControl(''));
  }

  public createQuestion(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.dialogRef.close(this.formGroup.value);
  }
}
