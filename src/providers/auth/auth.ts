import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthProvider {

  constructor(
    public afAuth: AngularFireAuth
  ) {
    console.log('Hello AuthProvider Provider');
  }


  createAuthUser(user: {email: string, password: string}): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
  }

}
