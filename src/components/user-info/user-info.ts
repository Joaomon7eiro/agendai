import { User } from './../../models/user.model';
import { Component, Input } from '@angular/core';
import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { BaseComponent } from '../base/base';

@Component({
  selector: 'user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoComponent extends BaseComponent {

  @Input() user: User;
  @Input() isMenu: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public app: App,
    public menuCtrl: MenuController,
  ) {
    super(alertCtrl, authProvider, app, menuCtrl)
  }

  onBecameIndependent () : void {
    this.navCtrl.push('RegisterIndependentPage')
  }

}
