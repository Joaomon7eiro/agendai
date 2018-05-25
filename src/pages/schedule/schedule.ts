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

  independent : Independent

  currentUser : User

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

  onChange($event) {
    console.log($event);
  }

  confirmSchedule () : void {

    let loading : Loading = this.showLoading();

    let scheduleForm = new Schedule(this.independent.name, this.date.calendar(), 'segunda-feira' , this.time, this.independent.imageSrc)

    console.log(scheduleForm);

    this.scheduleProvider.create(scheduleForm, 'sNT1xGv7aARPRfcIjVgtH50JBEf1' , this.independent.$key ).then(() => {
      console.log("agendamento criado")
      loading.dismiss()
      this.navCtrl.setRoot(HomePage);
    }).catch(( error : any) =>{
      console.log(error);
      loading.dismiss();
      this.showAlert(error);
    });;



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
