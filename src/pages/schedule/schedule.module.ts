import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulePage } from './schedule';
import { CalendarModule } from "ion2-calendar";
@NgModule({
  declarations: [
    SchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(SchedulePage),
    CalendarModule
  ],
})
export class SchedulePageModule {}
