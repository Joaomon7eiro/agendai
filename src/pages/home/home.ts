import { UserProvider } from './../../providers/user/user';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;

  constructor(
              public userProvider : UserProvider,
              public authProvider: AuthProvider,
              public navCtrl: NavController)
  {

  }

  ionViewCanEnter() : Promise<boolean>{
    return this.authProvider.authenticated;
  }

  ionViewDidLoad(){
    this.users = this.userProvider.users;
  }

  logout () : void {
    this.authProvider.logout();
    this.navCtrl.setRoot('LoginPage');
  }

}
