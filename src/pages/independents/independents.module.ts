import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndependentsPage } from './independents';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    IndependentsPage,
  ],
  imports: [
    IonicPageModule.forChild(IndependentsPage),
    ComponentsModule
  ],
})
export class IndependentsPageModule {}
