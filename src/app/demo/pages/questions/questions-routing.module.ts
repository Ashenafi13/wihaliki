import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuestionsComponent} from './questions.component';
import { WinnersComponent } from './winners/winners.component';
const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent
  },
  {
    path: 'winners',
    component: WinnersComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
