import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule , FirebaseAppConfig } from 'angularfire2';

const firebaseAppConfig : FirebaseAppConfig = {
  apiKey: "AIzaSyCf3ydJ5-NzgvNglfTL6Y1Hxxw7tKoMznU",
  authDomain: "app-agenda-4191b.firebaseapp.com",
  databaseURL: "https://app-agenda-4191b.firebaseio.com",
  storageBucket: "app-agenda-4191b.appspot.com",
  messagingSenderId: "633943345729"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
