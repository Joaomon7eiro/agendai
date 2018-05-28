import { Schedule } from './../../models/schedule.model';
import { UserProvider } from './../../providers/user/user';
import { ScheduleProvider } from './../../providers/schedule/schedule';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { Independent } from '../../models/independent.model';
import { User } from '../../models/user.model';
import 'rxjs/add/operator/first';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  time : string
  date : Date;

  type: 'string';

  hourValues : string[]

  independent : Independent

  array :string[]

  hoursUnavailable : Observable<any>

  unavailableArray : any[] = []

  hoursAndMinutes : string[]

  constructor(
    public db : AngularFireDatabase,
    public alertCtrl : AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public scheduleProvider : ScheduleProvider,
    public loadingCtrl : LoadingController,
    public userProvider : UserProvider)
  {
      this.independent = this.navParams.get('independent')
  }

  ionViewWillEnter(){

  }

  onSelect($event) {
    console.log($event)
    this.hoursUnavailable = this.db.list(`/hoursUnavailable/${this.independent.id}/${this.date.format('l').toString().replace(/\//g, '-')}`).valueChanges();

    this.hourValues = [`${this.independent.startTime}`]
    for(let i = this.independent.startTime + 1; i <= this.independent.endTime; i++ ){
      this.hourValues.push(`${i}`)
    }

    this.hoursAndMinutes= [`${this.independent.startTime}:00`]


    this.hoursUnavailable.subscribe(value => {
      if(value.length != 0){
        this.unavailableArray = value
      }else{
        this.unavailableArray = []
      }
    })

    for(let i = this.independent.duration, j = this.hourValues.length ,
        k = 1, l = this.independent.startTime; k < j ; i += this.independent.duration ){
      if(i>=60){
        i -= 60;
        l++;
        k++;
      }

      if(this.unavailableArray.length != 0){
        if(this.unavailableArray[0].time != `${l}:0${i}` && this.unavailableArray[0].time != `${l}:${i}` && this.unavailableArray[1].time != `${l}:0${i}` && this.unavailableArray[1].time != `${l}:${i}` ){
          console.log(`hora agr ${l}:${i}`)
          i == 0 ? this.hoursAndMinutes.push(`${l}:0${i}`) : this.hoursAndMinutes.push(`${l}:${i}`)
        }
      }else{
        i == 0 ? this.hoursAndMinutes.push(`${l}:0${i}`) : this.hoursAndMinutes.push(`${l}:${i}`)
      }

    }



}

  confirmSchedule () : void {

    let loading : Loading = this.showLoading();

    this.userProvider.mapObjectKey<User>(this.userProvider.currentUser).first().subscribe((currentUser: User) => {

      let scheduleForm = new Schedule(this.independent.name, this.date.format('l') , this.date.format('dddd') , this.time, this.independent.imageSrc)

      this.scheduleProvider.create(scheduleForm, currentUser.id , this.independent.id ).then(() => {
        console.log("agendamento criado")
        loading.dismiss()
        this.navCtrl.setRoot(HomePage);
      }).catch(( error : any) =>{
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });
      delete scheduleForm.name
      delete scheduleForm.day
      delete scheduleForm.photo
      this.scheduleProvider.unavailableHour(scheduleForm , this.independent.id)
    });

  }

  private showLoading () : Loading {
    let loading : Loading = this.loadingCtrl.create({
      content : 'Agendando...'
    })

    loading.present();

    return loading;
  }


  private showAlert (message) : void {
    this.alertCtrl.create({
      message : message,
      buttons : ['Ok']
    }).present();
  }

}
