import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantsRoutingModule } from './participants-routing.module';
import { ParticipantsComponent } from './participants.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd';
import { WebdatarocksPivotModule } from 'ng-webdatarocks';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
  declarations: [ParticipantsComponent],
  imports: [
    CommonModule,
    ParticipantsRoutingModule,
    SharedModule,
    WebdatarocksPivotModule,
    NzTableModule,
    NzDrawerModule,
    NzButtonModule
  ]
})
export class ParticipantsModule { }
