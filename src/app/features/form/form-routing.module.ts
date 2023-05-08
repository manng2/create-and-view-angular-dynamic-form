import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'builder',
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((it) => it.BuilderModule),
  },
  {
    path: 'answer',
    loadChildren: () =>
      import('./answer/answer.module').then((it) => it.AnswerModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
