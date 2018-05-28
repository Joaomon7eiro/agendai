import { Schedule } from './../../models/schedule.model';
import { UserProvider } from './../../providers/user/user';
import { ScheduleProvider } from './../../providers/schedule/schedule';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { Independent } from '../../models/independent.model';
import { User } from '../../models/user.model';
import 'rxjs/add/operator/first';


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

  minuteValues : string[] = ['0']

  independent : Independent

  constructor(
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
    this.hourValues = [`${this.independent.startTime}`]
    for(let i = this.independent.startTime + 1; i <= this.independent.endTime; i++ ){
      this.hourValues.push(`${i}`)
    }

    console.log(this.hourValues)
    console.log(this.independent.duration)

    //if (this.independent.duration <= 30){

      for(let i = this.independent.duration ; i <= 60; i += this.independent.duration ){
        this.minuteValues.push(`${i}`)
      }
      console.log(this.minuteValues)

    //}



  }
  onChange($event) {
    console.log($event);
  }

  confirmSchedule () : void {

    let loading : Loading = this.showLoading();

    this.userProvider.mapObjectKey<User>(this.userProvider.currentUser).first().subscribe((currentUser: User) => {

      let scheduleForm = new Schedule(this.independent.name, this.date.format('l') , this.date.format('dddd') , this.time, this.independent.imageSrc)

      console.log(scheduleForm);
      console.log(this.independent.id);
      console.log(currentUser.id);

      this.scheduleProvider.create(scheduleForm, currentUser.id , this.independent.id ).then(() => {
        console.log("agendamento criado")
        loading.dismiss()
        this.navCtrl.setRoot(HomePage);
      }).catch(( error : any) =>{
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });;


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
