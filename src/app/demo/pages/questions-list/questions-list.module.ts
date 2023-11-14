import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsListRoutingModule } from './questions-list-routing.module';
import { QuestionsListComponent } from './questions-list.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd';
import { WebdatarocksPivotModule } from 'ng-webdatarocks';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
  declarations: [QuestionsListComponent],
  imports: [
    CommonModule,
    QuestionsListRoutingModule,
    SharedModule,
    NzTableModule,
    WebdatarocksPivotModule,
    NzDrawerModule,
    NzButtonModule
  ]
})
export class QuestionsListModule { }
