import { User } from './../../models/user.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoComponent {

  @Input() user: User;
  @Input() isMenu: boolean = false;

  constructor() {
  }

}
