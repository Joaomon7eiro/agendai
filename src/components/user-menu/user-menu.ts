import { User } from './../../models/user.model';
import { Component, Input} from '@angular/core';
import { BaseComponent } from '../base/base';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the UserMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User

  constructor(
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authProvider, app, menuCtrl)
  }

  pushProfile () : void {
    console.log("perfil edit ?");
  }
}
