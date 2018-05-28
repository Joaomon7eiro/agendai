import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Independent } from '../../models/independent.model';

@IonicPage()
@Component({
  selector: 'page-independents',
  templateUrl: 'independents.html',
})
export class IndependentsPage {

  independents : Observable<Independent[]>;

  constructor(
    public db : AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  category = this.navParams.get('category')

  ionViewDidLoad() {

    this.independents = this.db.list<Independent>(`/independents/${this.category.id}`).valueChanges();

  }

  schedule (independent) : void {
    this.navCtrl.push('SchedulePage', { independent : independent })
  }
}

