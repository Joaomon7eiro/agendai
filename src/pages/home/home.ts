import { Schedule } from './../../models/schedule.model';
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

  schedules: Observable<Schedule[]>;

  title: string = 'Meus Agendamentos'
  constructor(
              public db : AngularFireDatabase,
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

    this.userProvider.mapObjectKey<User>(this.userProvider.currentUser).first().subscribe((currentUser: User) => {
      this.schedules = this.db.list<Schedule>(`/schedules/${currentUser.id}`).valueChanges();
    });
  }

  logout () : void {
    this.authProvider.logout();
    this.navCtrl.setRoot('LoginPage');
  }

}
