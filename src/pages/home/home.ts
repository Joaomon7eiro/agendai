import { UserProvider } from './../../providers/user/user';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;

  schedules: Observable<any>;

  title: string = 'Meus Agendamentos'
  constructor(
              public db : AngularFireDatabase,
              public userProvider : UserProvider,
              public authProvider: AuthProvider,
              public navCtrl: NavController)
  {
    this.schedules = this.db.list(`/schedules/sNT1xGv7aARPRfcIjVgtH50JBEf1`).valueChanges();
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
