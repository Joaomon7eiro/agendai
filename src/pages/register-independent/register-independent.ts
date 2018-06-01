import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import * as firebase from 'firebase/app';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-register-independent',
  templateUrl: 'register-independent.html',
})
export class RegisterIndependentPage {

  signIndependentForm : FormGroup;

  private filePhoto: File;

  category: string

  currentUser: User;

  photoUrl:string

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder : FormBuilder,
     public loadingCtrl : LoadingController,
     public userProvider : UserProvider,
     public alertCtrl: AlertController,
     public authProvider : AuthProvider,
     public db : AngularFireDatabase) {

      this.signIndependentForm = this.formBuilder.group({
        name       : ['' , Validators.required],
        category   : ['' , Validators.required],
        cost       : ['' , Validators.required],
        description: ['' , Validators.required],
        startTime  : ['' , Validators.required],
        endTime    : ['' , Validators.required],
        duration   : ['' , Validators.required],
        photo      : ['']
      })

      console.log(this.signIndependentForm.value)
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.userProvider.currentUser.valueChanges().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  onSubmit(): void {

    let loading : Loading = this.showLoading();
    let formUser = this.signIndependentForm.value

    if(parseFloat(formUser.startTime) >= parseFloat(formUser.endTime)){
      this.showAlert('As horas precisam de ajustes, horario inicial maior ou igual que final');
      loading.dismiss()
      return;
    }

    if (this.filePhoto) {

      let uploadTask = this.userProvider.uploadPhotoIndependent(this.filePhoto, this.currentUser.id, formUser.category);

      uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {

     //this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

     }, (error: Error) => {
       // catch error
     });
     formUser.startTime = `${parseFloat(formUser.startTime)}`
     formUser.endTime   = `${parseFloat(formUser.endTime)}`

     uploadTask.then((UploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {
      console.log(uploadTask.snapshot.downloadURL)
      this.userProvider.createIndependent(formUser, this.currentUser.id , formUser.category ,this.currentUser.telephone , uploadTask.snapshot.downloadURL).then(() => {
        console.log("independente cadastrado com sucesso")
        loading.dismiss()
        this.navCtrl.setRoot(TabsPage);
      }).catch(( error : any) =>{
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });
     });

    }else{
      this.userProvider.createIndependent(formUser, this.currentUser.id , formUser.category ,this.currentUser.telephone , "").then(() => {
        console.log("independente cadastrado com sucesso")
        loading.dismiss()
        this.navCtrl.setRoot(TabsPage);
      }).catch(( error : any) =>{
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });
    }



  }

  onPhoto(event): void {
    this.filePhoto = event.target.files[0];
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
