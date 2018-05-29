import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories : Observable<any>;

  constructor(
              public db : AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');

    this.categories = this.db.list('/categories').valueChanges();
  }

  showIndependent (category) : void {
    this.navCtrl.push('IndependentsPage', {category : category})
  }

}
