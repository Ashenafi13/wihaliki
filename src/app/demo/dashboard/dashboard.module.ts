import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NzButtonModule
  ],
  providers: [ CookieService ],
})
export class DashboardModule { }
