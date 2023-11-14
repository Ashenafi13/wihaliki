import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add-questions',
        loadChildren: () => import('../../pages/addQuestions/add-questions.module').then(module => module.AddQuestionModule)
      },
      {
        path: 'seasons',
        loadChildren: () => import('../../pages/season/season.module').then(module => module.SeasonModule)
      },
      {
        path: 'questions',
        loadChildren: () => import('../../pages/questions/questions.module').then(module => module.QuestionsModule)
      },
      {
        path: 'questions-list',
        loadChildren: () => import('../../pages/questions-list/questions-list.module').then(module => module.QuestionsListModule)
      },
      {
        path: 'participants',
        loadChildren: () => import('../../pages/participants/participants.module').then(module => module.ParticipantsModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule { }
