import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import { User } from '../modelos/user';
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }else{
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
   }


   setUserData(user: any){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `user/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,

    }
    return userRef.set(userData, {
      merge: true
    });


   }

   login(email:string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password).then(result => {
      this.setUserData(result.user);
      this.afAuth.authState.subscribe(user => {
        if(user){
          this.router.navigate(['home']);
        }
      })
    }).catch(() =>{

    })
   }

   register(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(result =>{
      result.user?.sendEmailVerification();
      this.setUserData(result.user);
      this.sendEmailForVerification(result.user);
    }).catch(() =>{

    })
   }

   logout(){
    return this.afAuth.signOut().then(() =>{
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
   }

   recordarContrasena(email: string){
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Error->');
    })
   }

   sendEmailForVerification(user: any){
    user.sendEmailForVerification().then((res: any) =>{
      this.router.navigate(['/verificar-correo']);
    }, (err: any) =>{
      console.log("error");
    })
   }

   googleSignIn(){
    return this.afAuth.signInWithPopup(new GoogleAuthProvider).then((res) => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      console.log(err.message);
    })
   }
}
