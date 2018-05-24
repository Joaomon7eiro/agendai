import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  onSubmit () : void {
    console.log(this.signInForm.value)

  }

}
