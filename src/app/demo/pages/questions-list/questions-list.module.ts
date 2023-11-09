import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsListRoutingModule } from './questions-list-routing.module';
import { QuestionsListComponent } from './questions-list.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [QuestionsListComponent],
  imports: [
    CommonModule,
    QuestionsListRoutingModule,
    SharedModule,
    NzTableModule
  ]
})
export class QuestionsListModule { }
