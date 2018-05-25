import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CustomHeaderComponent } from './custom-header/custom-header';
@NgModule({
	declarations: [CustomHeaderComponent],
	imports: [IonicModule],
	exports: [CustomHeaderComponent]
})
export class ComponentsModule {}
