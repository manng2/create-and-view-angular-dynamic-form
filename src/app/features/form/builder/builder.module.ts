import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderComponent } from './components/builder/builder.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormAddQuestionComponent } from './components/form-add-question/form-add-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DynamicQuestionComponent } from './components/dynamic-question/dynamic-question.component';

@NgModule({
  declarations: [
    BuilderComponent,
    FormAddQuestionComponent,
    DynamicQuestionComponent,
  ],
  imports: [
    CommonModule,
    BuilderRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class BuilderModule {}
