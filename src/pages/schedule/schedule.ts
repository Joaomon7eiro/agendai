import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { Schedule } from './../../models/schedule.model';
import { UserProvider } from './../../providers/user/user';
import { ScheduleProvider } from './../../providers/schedule/schedule';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { Independent } from '../../models/independent.model';
import { User } from '../../models/user.model';
import 'rxjs/add/operator/first';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { CategoriesPage } from '../categories/categories';
import { Moment} from './../../../node_modules/moment'
import 'moment/locale/pt-br';


import { Subscription } from "rxjs/Subscription";



@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

  time : string
  date : Moment;

  type: 'moment';

  dateValue : string

  hourValues : string[]

  independent : Independent

  array :string[]

  hoursUnavailable : Observable<any>

  unavailableArray : any[] = []

  hoursAndMinutes : string[]

  scheduleForm : FormGroup

  unSub: Subscription

  constructor(
    public db : AngularFireDatabase,
    public alertCtrl : AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public scheduleProvider : ScheduleProvider,
    public loadingCtrl : LoadingController,
    public userProvider : UserProvider,
    public formBuilder : FormBuilder)
  {
      this.independent = this.navParams.get('independent')

      this.scheduleForm = this.formBuilder.group({
        date   : ['',  [Validators.required] ],
        time   : ['',  [Validators.required] ]
      })
  }


  onChange($event) {

    this.dateValue = this.date.format("DD-MM-YYYY");

    this.hoursUnavailable = this.db.list(`/hoursUnavailable/${this.independent.id}/${this.dateValue}`).valueChanges();

    this.hourValues = [`${this.independent.startTime}`]

    for(let i = parseFloat(this.independent.startTime) + 1; i <= Math.ceil(parseFloat(this.independent.endTime)); i++ ){
      this.hourValues.push(`${i}`)
    }

    this.hoursAndMinutes = []

    this.unSub = this.hoursUnavailable.subscribe(
      value => {
        if(value.length != 0){
          this.unavailableArray = value
        }else{
          this.unavailableArray = []
        }
      }
    )

    setTimeout(() :void => {


      for(let i = 0, j = this.hourValues.length ,
          k = 1, l = parseFloat(this.independent.startTime); k < j ; i += parseFloat(this.independent.duration)){

        if(i>=60){
          i -= 60;
          l++;
          k++;
        }

        if(this.unavailableArray.length != 0){

          let aux = 0;
          for(let m = 0; m < this.unavailableArray.length; m++){
            if( this.unavailableArray[m].time == `${l}:0${i}` || this.unavailableArray[m].time == `${l}:${i}`){
              this.showAlert(this.unavailableArray[m].time)
              aux = 1;
              break;
            }
          }
          if (aux != 1){
            i < 10 ? this.hoursAndMinutes.push(`${l}:0${i}`) : this.hoursAndMinutes.push(`${l}:${i}`)
          }
        }else{
          i < 10 ? this.hoursAndMinutes.push(`${l}:0${i}`) : this.hoursAndMinutes.push(`${l}:${i}`)
        }

      }

    } , 650)
  }

  cancelSchedule () : void {
    this.navCtrl.setRoot(CategoriesPage);
  }

  confirmSchedule () : void {

    this.unSub.unsubscribe()

    let loading : Loading = this.showLoading();

    this.userProvider.mapObjectKey<User>(this.userProvider.currentUser).first().subscribe((currentUser: User) => {

      let scheduleForm = new Schedule( currentUser.name, this.independent.name ,this.dateValue , this.date.format('dddd') , this.time)

      this.scheduleProvider.create(scheduleForm, currentUser.id , this.independent.id ).then(() => {
        console.log("agendamento criado")
        loading.dismiss()
        this.navCtrl.setRoot(CategoriesPage);
      }).catch(( error : any) =>{
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });

      this.scheduleProvider.createAux(scheduleForm, currentUser.id , this.independent.id )
      delete scheduleForm.nameClient
      delete scheduleForm.nameIndependent
      delete scheduleForm.day
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
