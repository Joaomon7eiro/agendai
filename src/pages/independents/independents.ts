import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Independent } from '../../models/independent.model';
import { User } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-independents',
  templateUrl: 'independents.html',
})
export class IndependentsPage {

  independents : Observable<Independent[]>;
  currentUserId : String
  ratings : Observable<any[]>
  constructor(
    public db : AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider : UserProvider) {
  }

  category = this.navParams.get('category')

  ionViewWillEnter(){
    this.userProvider.mapObjectKey<User>(this.userProvider.currentUser).first().subscribe((currentUser: User) => {
      this.currentUserId = currentUser.id;
    });
  }

  ionViewDidLoad() {
    console.log(this.currentUserId)
    this.independents = this.db.list<Independent>(`/independents/${this.category.id}`).valueChanges();

    this.ratings = this.db.list(`/ratings`).valueChanges();

  }

  schedule (independent) : void {
    this.navCtrl.push('SchedulePage', { independent : independent })
  }
}

