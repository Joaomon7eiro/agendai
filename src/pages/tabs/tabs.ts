import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CategoriesPage } from '../categories/categories';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoriesPage;

  constructor() {

  }
}
