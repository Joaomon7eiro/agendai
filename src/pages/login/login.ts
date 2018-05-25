import { AuthProvider } from './../../providers/auth/auth';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  signInForm : FormGroup;

  emailRegex  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



  constructor(
              public authService: AuthProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public formBuilder : FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams)
  {

    this.signInForm = this.formBuilder.group({
      email     : ['', Validators.compose([Validators.required,Validators.pattern(this.emailRegex)])],
      password  : ['' , [Validators.required, Validators.minLength(8)]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  pushRegisterPage () : void  {
    this.navCtrl.push('RegisterPage');
  }

  pushHomePage () : void {
    this.navCtrl.setRoot(HomePage);
  }

  onSubmit () : void {
    console.log(this.signInForm.value)

    let loading: Loading = this.showLoading();

    this.authService.signInWithEmail(this.signInForm.value)
      .then((isLogged: boolean) => {

        if (isLogged) {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }

      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });

  }

  private showLoading () : Loading {
    let loading : Loading = this.loadingCtrl.create({
      content : 'Logando...'
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
