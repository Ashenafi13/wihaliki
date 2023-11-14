import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantsRoutingModule } from './participants-routing.module';
import { ParticipantsComponent } from './participants.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { WebdatarocksPivotModule } from 'ng-webdatarocks';
@NgModule({
  declarations: [ParticipantsComponent],
  imports: [
    CommonModule,
    ParticipantsRoutingModule,
    SharedModule,
    WebdatarocksPivotModule
  ]
})
export class ParticipantsModule { }
