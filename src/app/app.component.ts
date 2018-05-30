import { TabsPage } from './../pages/tabs/tabs';
import { UserProvider } from './../providers/user/user';
import { AuthProvider } from './../providers/auth/auth';
import { User } from './../models/user.model';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CategoriesPage } from '../pages/categories/categories';

import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  currentUser: User;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authProvider:AuthProvider,
    public userProvider :UserProvider
    ) {

    authProvider.afAuth.authState.subscribe((authUser: firebase.User) => {

      if (authUser) {

        this.rootPage = TabsPage;

        userProvider.currentUser.valueChanges().subscribe((user: User) => {
          this.currentUser = user;
        });

      }

    });
    this.initializeApp();


  }





  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
