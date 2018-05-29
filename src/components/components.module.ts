import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CustomHeaderComponent } from './custom-header/custom-header';
import { UserInfoComponent } from './user-info/user-info';
import { UserMenuComponent } from './user-menu/user-menu';
@NgModule({
	declarations: [CustomHeaderComponent,
    UserInfoComponent,
    UserMenuComponent],
	imports: [IonicModule],
	exports: [CustomHeaderComponent,
    UserInfoComponent,
    UserMenuComponent]
})
export class ComponentsModule {}
