import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashDefaultRoutingModule } from './dash-default-routing.module';
import { DashDefaultComponent } from './dash-default.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [DashDefaultComponent],
  imports: [
    CommonModule,
    DashDefaultRoutingModule,
    SharedModule,
    NzButtonModule,
    NzBadgeModule,
    NzTimelineModule,
    NzAvatarModule,
    NzIconModule
  ]
})
export class DashDefaultModule { }
