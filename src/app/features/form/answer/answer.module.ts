import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerRoutingModule } from './answer-routing.module';
import { AnswerComponent } from './components/answer/answer.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AnswerComponent],
  imports: [CommonModule, AnswerRoutingModule, MatButtonModule],
})
export class AnswerModule {}
