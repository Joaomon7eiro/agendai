import { TabsPage } from './../tabs/tabs';
import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  signUpForm : FormGroup;


  emailRegex  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numberRegex = /^\d+$/ ;



  constructor(
              public alertCtrl : AlertController,
              public authProvider : AuthProvider,
              public formBuilder : FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider : UserProvider,
              public loadingCtrl : LoadingController
            )
  {

    this.signUpForm = this.formBuilder.group({
      email     : ['', Validators.compose([Validators.required,Validators.pattern(this.emailRegex)])],
      password  : ['' , [Validators.required, Validators.minLength(8)]],
      telephone : ['', Validators.compose([Validators.required,Validators.pattern(this.numberRegex),Validators.minLength(9)])],
      useTerms  : [false, [Validators.requiredTrue]],
      name      : ['' , [Validators.required, Validators.minLength(4)]],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onSubmit () : void {
    //this.navCtrl.push('LoginPage');
    let loading : Loading = this.showLoading();
    let formUser = this.signUpForm.value

    this.authProvider.createAuthUser({
      email: formUser.email,
      password: formUser.password
    }).then((authUser : firebase.User ) => {

      delete formUser.password
      delete formUser.useTerms

      let uuid : string = authUser.uid

      this.userProvider.create(formUser, uuid).then(() => {
        console.log("usuario cadastrado com sucesso")
        loading.dismiss()
        this.navCtrl.setRoot(TabsPage);
      }).catch(( error : any) =>{
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });;

    }).catch(( error : any) =>{
      console.log(error);
      loading.dismiss();
      this.showAlert(error);
    });

  }

  private showLoading () : Loading {
    let loading : Loading = this.loadingCtrl.create({
      content : 'Aguarde...'
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
