import { User } from './../../models/user.model';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public authProvider : AuthProvider,
              public formBuilder : FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider : UserProvider)
  {
    this.signUpForm = this.formBuilder.group({
      email     : ['', Validators.compose([Validators.required,Validators.pattern(this.emailRegex)])],
      password  : ['' , [Validators.required, Validators.minLength(8)]],
      telephone : ['', Validators.compose([Validators.required,Validators.pattern(this.numberRegex),Validators.minLength(9)])],
      useTerms  : [false, [Validators.requiredTrue]]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }



  onSubmit () : void {
    //this.navCtrl.push('LoginPage');

    let formUser = this.signUpForm.value

    this.authProvider.createAuthUser({
      email: formUser.email,
      password: formUser.password
    }).then((authUser : firebase.User ) => {

      delete formUser.password
      delete formUser.useTerms

      let uuid : string = authUser.user.uid;

      this.userProvider.create(formUser, uuid).then(() => {
        console.log("usuario cadastrado com sucesso")
        this.navCtrl.setRoot(HomePage);
      });

    });



  }
}
