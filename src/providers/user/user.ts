import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject  } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { BaseProvider } from '../base/base';
import * as firebase from 'firebase/app';
import { FirebaseApp } from "angularfire2";
import { Http } from '@angular/http';
import 'firebase/storage';

@Injectable()
export class UserProvider extends BaseProvider {

  users: Observable<User[]>;
  currentUser: AngularFireObject<User>;

  constructor(
    public afAuth :AngularFireAuth,
    public firebaseApp: FirebaseApp,
    public db : AngularFireDatabase,
    public http: Http
  ){
    super();
    //this.users = this.db.list<User>('/users').valueChanges();
    this.listenAuthState()
  }

  private listenAuthState(): void {
    this.afAuth.authState.subscribe((authUser: firebase.User) => {
        if (authUser) {
          this.currentUser = this.db.object(`/users/${authUser.uid}`);
        }
      });
  }

  create(user: User, uuid : string ): Promise<void> {
    user.id = uuid;
    return this.db.object(`/users/${uuid}`).set(user).catch(this.handlePromiseError);
  }

  edit(user: {name: string, telephone: string, photo: string}): Promise<void> {
    return this.currentUser.update(user).catch(this.handlePromiseError);
  }

  uploadPhoto(file: File, userId: string): firebase.storage.UploadTask {
    return this.firebaseApp.storage().ref().child(`/users/${userId}`).put(file);
  }

  userExists(email: string): Observable<boolean> {
    return this.db.list(`/users`,
      (ref: firebase.database.Reference) => ref.orderByChild('email').equalTo(email)
    ).valueChanges().map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

}

