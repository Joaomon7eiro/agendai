import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {

  independentId : string;
  clientId : string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl:AlertController,
     public viewCtrl: ViewController
    ){
      this.independentId = navParams.get('idIndependent')
      this.clientId = navParams.get('idClient')
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
  }

  onModelChange (rate) : void {
    this.showAlert('Confirmar avaliação?', rate, this.independentId,this.clientId);
    //console.log(event)
    //console.log(this.id)
  }

  private showAlert (message, rate, independentId, clientId) : void {
    let data = { rate: rate, independentId: independentId, clientId: clientId };

    this.alertCtrl.create({
      message : message,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.viewCtrl.dismiss(data);
          }
        },
        {
            text: 'Não'
        }
    ]
    }).present();
  }

}
