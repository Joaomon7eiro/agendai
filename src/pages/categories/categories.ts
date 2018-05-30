import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categories : Observable<any>;

  constructor(
              public db : AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider:AuthProvider) {
  }

  ionViewCanEnter () : Promise<boolean>{
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');

    this.categories = this.db.list('/categories').valueChanges();
  }

  showIndependent (category) : void {
    this.navCtrl.push('IndependentsPage', {category : category})
  }

}
