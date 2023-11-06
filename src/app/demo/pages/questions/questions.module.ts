import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd/table';
@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,
    NzTableModule
  ]
})
export class QuestionsModule { }
