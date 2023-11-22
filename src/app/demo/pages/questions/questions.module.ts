import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { WinnersComponent } from './winners/winners.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@NgModule({
  declarations: [QuestionsComponent, WinnersComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,
    NzButtonModule,
    NzBadgeModule,
    NzTimelineModule,
    NzAvatarModule,
    NzIconModule,
    NzResultModule,
    NzTableModule,
    NzDividerModule,
    NzDrawerModule,
    NzSkeletonModule,
    NzProgressModule,
    NzPaginationModule
  ]
})
export class QuestionsModule { }
