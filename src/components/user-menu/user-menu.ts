import { User } from './../../models/user.model';
import { Component, Input} from '@angular/core';
import { BaseComponent } from '../base/base';
import { AlertController, App, MenuController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User

  hideIndependent : boolean = false

  constructor(
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authProvider, app, menuCtrl)
  }

  pushProfile () : void {
    this.navCtrl.push('UserProfilePage')
  }

  onBecameIndependent () : void {
    this.navCtrl.push('RegisterIndependentPage')
  }

  ngOnChanges() {
    this.hideIndependent = true
  }
}
