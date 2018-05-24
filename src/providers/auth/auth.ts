import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BaseProvider } from '../base/base';


@Injectable()
export class AuthProvider extends BaseProvider {

  constructor(
    public afAuth: AngularFireAuth
  ) {
    super();
    console.log('Hello AuthProvider Provider');
  }


  createAuthUser(user: {email: string, password: string}): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).catch(this.handlePromiseError)
  }

}
