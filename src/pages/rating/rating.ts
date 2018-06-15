import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {

  id : string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl:AlertController,
     public viewCtrl: ViewController) {
    this.id = navParams.get('id')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
  }

  onModelChange (event) : void {
    this.showAlert('Confirmar avaliação?');
    console.log(event)
    console.log(this.id)
  }

  private showAlert (message) : void {
    this.alertCtrl.create({
      message : message,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        },
        {
            text: 'Não'
        }
    ]
    }).present();
  }

}
