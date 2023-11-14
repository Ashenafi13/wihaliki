import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantsRoutingModule } from './participants-routing.module';
import { ParticipantsComponent } from './participants.component';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  declarations: [ParticipantsComponent],
  imports: [
    CommonModule,
    ParticipantsRoutingModule,
    SharedModule
  ]
})
export class ParticipantsModule { }
