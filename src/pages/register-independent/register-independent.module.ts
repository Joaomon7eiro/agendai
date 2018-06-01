import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterIndependentPage } from './register-independent';

@NgModule({
  declarations: [
    RegisterIndependentPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterIndependentPage),
    ComponentsModule
  ],
})
export class RegisterIndependentPageModule {}
