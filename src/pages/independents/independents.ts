import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the IndependentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-independents',
  templateUrl: 'independents.html',
})
export class IndependentsPage {

  independents : Observable<any>;

  constructor(
    public db : AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  category = this.navParams.data

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndepedentsPage');
    console.log(this.category);

    this.independents = this.db.list(`/independents/${this.category.name}`).valueChanges();

  }


  schedule (independent) : void {
    this.navCtrl.push('SchedulePage', independent)
  }
}
