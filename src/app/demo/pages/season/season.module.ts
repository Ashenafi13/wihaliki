import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonRoutingModule } from './season-routing.module';
import { SeasonComponent } from './season.component';
import { HttpClientModule } from '@angular/common/http';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import {MatButtonModule} from '@angular/material/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SeasonComponent],
  imports: [
    CommonModule,
   SeasonRoutingModule,
    SharedModule,
    MatButtonModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    HttpClientModule,
    NzTableModule,
    NzPopconfirmModule,
    NzNotificationModule,
    NzMessageModule,
    NzTimelineModule,
    NgbCollapseModule



  ]
})
export class SeasonModule { }
