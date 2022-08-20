import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private auth:Auth) { }

  register(email:any, password:any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginWithEmailPass(email:any, password:any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }


  logout(){
    return signOut(this.auth);
  }
}
