import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { BaseProvider } from '../base/base';

@Injectable()
export class UserProvider extends BaseProvider {

  users: Observable<User[]>;

  constructor(
    public db : AngularFireDatabase
  ){
    super();
    console.log('Hello UserProvider Provider');
  }


  create(user: User, uuid : string ): Promise<void> {
    return this.db.object(`/users/${uuid}`).set(user).catch(this.handlePromiseError);
  }
}
