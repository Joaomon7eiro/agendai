import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject  } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { BaseProvider } from '../base/base';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { map } from 'rxjs/operators/map';

@Injectable()
export class UserProvider extends BaseProvider {

  users: Observable<User[]>;
  currentUser: AngularFireObject<User>;

  constructor(
    public afAuth :AngularFireAuth,
    public db : AngularFireDatabase
  ){
    super();
    this.users = this.db.list<User>('/users').valueChanges();
  }

  create(user: User, uuid : string ): Promise<void> {
    return this.db.object(`/users/${uuid}`).set(user).catch(this.handlePromiseError);
  }

  userExists(email: string): Observable<boolean> {
    return this.db.list(`/users`,
      (ref: firebase.database.Reference) => ref.orderByChild('email').equalTo(email)
    ).valueChanges().map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

}

