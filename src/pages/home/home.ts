import { Schedule } from './../../models/schedule.model';
import { UserProvider } from './../../providers/user/user';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;

  schedules: Observable<Schedule[]>;

  notebook : Observable<Schedule[]>;

  currentUser : User

  unSub: Subscription

  setNote : boolean = false

  title: string = 'Meus Agendamentos'


  constructor(public navParams: NavParams,
              public db : AngularFireDatabase,
              public userProvider : UserProvider,
              public authProvider: AuthProvider,
              public navCtrl: NavController,
              public menuCtrl: MenuController,
              public cd: ChangeDetectorRef)
  {

  }

  ionViewCanEnter () : Promise<boolean>{
    return this.authProvider.authenticated;
  }
  ionViewWillEnter(){
    if(this.notebook){
      this.unSub = this.notebook.subscribe(
        value => {
          if(value.length != 0){
            this.setNote = true
          }
        }
      )
      setTimeout(() :void => {this.unSub.unsubscribe()},1000)
    }
  }
  ionViewWillLeave(){
    this.unSub.unsubscribe()
  }

  ionViewDidLoad(){
    this.userProvider.mapObjectKey<User>(this.userProvider.currentUser).first().subscribe((currentUser: User) => {
      this.notebook = this.db.list<Schedule>(`/notebook/${currentUser.id}`).valueChanges();
      this.unSub = this.notebook.subscribe(
        value => {
          if(value.length != 0){
            this.setNote = true
          }
        }
      )
      setTimeout(() :void => {this.unSub.unsubscribe()},1000)
    });
    this.users = this.userProvider.users;

    this.userProvider.mapObjectKey<User>(this.userProvider.currentUser).first().subscribe((currentUser: User) => {
      this.schedules = this.db.list<Schedule>(`/schedules/${currentUser.id}`).valueChanges();
    });


    this.menuCtrl.enable(true)
  }

}
