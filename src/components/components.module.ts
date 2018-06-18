import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CustomHeaderComponent } from './custom-header/custom-header';
import { UserInfoComponent } from './user-info/user-info';
import { UserMenuComponent } from './user-menu/user-menu';
import { ProgressBarComponent } from './progressbar/progressbar';

@NgModule({
	declarations: [CustomHeaderComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent
    ],
	imports: [IonicModule],
	exports: [CustomHeaderComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent
    ]
})
export class ComponentsModule {}
