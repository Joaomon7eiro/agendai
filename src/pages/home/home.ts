import { Schedule } from './../../models/schedule.model';
import { UserProvider } from './../../providers/user/user';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, MenuController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { User } from '../../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { RatingPage } from '../rating/rating';


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

  title: string = 'Agenda'

  ratingAvg : number;

  ratingObs: Observable<any[]>;

  btnId : string;

  constructor(public navParams: NavParams,
              public db : AngularFireDatabase,
              public userProvider : UserProvider,
              public authProvider: AuthProvider,
              public navCtrl: NavController,
              public menuCtrl: MenuController,
              public cd: ChangeDetectorRef,
              public alertCtrl : AlertController,
              public modalCtrl: ModalController,
              public viewCtrl: ViewController)
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
      setTimeout(() :void => {this.unSub.unsubscribe()},400)
    }
  }
  ionViewWillLeave(){
    //this.unSub.unsubscribe()
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
      setTimeout(() :void => {this.unSub.unsubscribe()},400)
    });
    this.users = this.userProvider.users;

    this.userProvider.mapObjectKey<User>(this.userProvider.currentUser).first().subscribe((currentUser: User) => {
      this.schedules = this.db.list<Schedule>(`/schedules/${currentUser.id}`).valueChanges();
    });

    this.menuCtrl.enable(true)
  }

  rate (idIndependent, idClient, categoryIndependent) : void {
    this.btnId = idIndependent;
    let rateModal = this.modalCtrl.create(RatingPage, { idIndependent : idIndependent, idClient: idClient }, {enableBackdropDismiss: true});
    rateModal.onDidDismiss(data => {
      if(data){
        let ratingList = [];
        this.userProvider.createRating(data.rate, data.clientId , data.independentId);
        this.ratingObs = this.db.list(`/rating/${data.independentId}`).valueChanges();
        this.ratingObs.forEach(rateValue => {
          rateValue.forEach(val => {
            ratingList.push(val.rating)
          });
        });

        let btn = document.getElementById(`${idIndependent}`);
        btn.remove();

        setTimeout(() :void => {
          let ratingAvg : number;
          let sum = 0;
          for( var i = 0; i < ratingList.length; i++ ){
              sum += parseInt( ratingList[i], 10 ); //don't forget to add the base
          }
          ratingAvg = Math.ceil(sum/ratingList.length);

          this.userProvider.updateRating(categoryIndependent, idIndependent, ratingAvg)
        },1000)
      }

    });
    rateModal.present();
  }

  onModelChange(event, independentId) : void {
    console.log(event)
    console.log(independentId)
  }

}
/*

{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "users":{
      ".read": true,
    	".write": true
    }
  }
}*/
