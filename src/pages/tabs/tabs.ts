import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CategoriesPage } from '../categories/categories';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoriesPage;


  constructor(public authProvider:AuthProvider) {

  }

  ionViewCanEnter () : Promise<boolean>{
    return this.authProvider.authenticated;
  }



}
