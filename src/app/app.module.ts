import { RatingPage } from './../pages/rating/rating';
import { CategoriesPage } from './../pages/categories/categories';
import { ComponentsModule } from './../components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule , LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule , FirebaseAppConfig } from 'angularfire2';
import { UserProvider } from '../providers/user/user';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
import { ScheduleProvider } from '../providers/schedule/schedule';
import { IndependentProvider } from '../providers/independent/independent';

import locale from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule } from '@angular/http';
import { Ionic2RatingModule } from 'ionic2-rating';

const firebaseAppConfig : FirebaseAppConfig = {
  apiKey: "AIzaSyCf3ydJ5-NzgvNglfTL6Y1Hxxw7tKoMznU",
  authDomain: "app-agenda-4191b.firebaseapp.com",
  databaseURL: "https://app-agenda-4191b.firebaseio.com",
  storageBucket: "app-agenda-4191b.appspot.com",
  messagingSenderId: "633943345729"
};

registerLocaleData(locale);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    CategoriesPage,
    RatingPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    HttpModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    CategoriesPage,
    RatingPage
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt' },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider,
    ScheduleProvider,
    IndependentProvider,
  ]
})
export class AppModule {}
