import { Injectable } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import { User } from '../modelos/user';
import { GoogleAuthProvider } from "firebase/auth";

import Swal from 'sweetalert2';

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
          Swal.fire({
            icon: 'success',
            title: '¡Ha iniciado Sesión correctamente!',
            heightAuto: false
          })
        }
      })
    }).catch((err) =>{
      console.log(err.message);
      if(err.message == 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La contraseña ingresada es incorrecta o el usuario no tiene contraseña',
          heightAuto: false
        })
      }
      else if(err.message == 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No existe un usuario que corresponda con este correo.',
          heightAuto: false
        })
      }
      else if(err.message == 'Firebase: An internal AuthError has occurred. (auth/internal-error).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal al intentar Iniciar Sesión, por favor, intente nuevamente.',
          heightAuto: false
        })
      }
      else if(err.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo con el que está intentado ingresar tiene un formato mal establecido.',
          heightAuto: false
        })
      }
      else if(err.message == 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este usuario ha sido desactivo al intentar acceder con él muchas veces, puede restaurarlo cambiando la contraseña o intentado más tarde.',
          heightAuto: false
        })
      }
   
   
    })
   }

   register(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(result =>{
      result.user?.sendEmailVerification();
      this.setUserData(result.user);
      // this.sendEmailForVerification(result.user);
      this.router.navigate(['inicio-sesion']);

      Swal.fire({
        icon: 'success',
        title: '¡Se ha registrado correctamente, puede Iniciar Sesión!',
        heightAuto: false
      })
    }).catch((err) =>{
      console.log(err.message);
      if(err.message == 'Firebase: An internal AuthError has occurred. (auth/internal-error).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal al intentar Registrarse, por favor, intente nuevamente.',
          heightAuto: false
        })
      }
      else if(err.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo con el que está intentado ingresar tiene un formato mal establecido.',
          heightAuto: false
        })
    
      }
      else if(err.message == 'Firebase: Error (auth/missing-email).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Falta diligenciar el campo de correo electrónico.',
          heightAuto: false
        })
      }
      else if(err.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo con el que está intentado ingresar tiene un formato mal establecido.',
          heightAuto: false
        })
      }
      else if(err.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este correo ya está registrado dentro de la aplicación.',
          heightAuto: false
        })
      }
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
      
      this.router.navigate(['inicio-sesion']);
      Swal.fire({
        icon: 'success',
        title: '¡Se envió correctamente la petición de recuperar la contraseña al correo digitado!',
        heightAuto: false
      })
    }, err => {
      console.log(err.message);

      if(err.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo con el que está intentado ingresar tiene un formato mal establecido.',
          heightAuto: false
        })
    
      }
      else if(err.message == 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No existe un usuario que corresponda con este correo.',
          heightAuto: false
        })
      }
    })
   }

  //  sendEmailForVerification(user: any){
  //   user.sendEmailForVerification().then((res: any) =>{
  //     this.router.navigate(['/verificar-correo']);
  //   }, (err: any) =>{
  //     console.log("error");
  //   })
  //  }

   googleSignIn(){
    return this.afAuth.signInWithPopup(new GoogleAuthProvider).then((res) => {
    
      this.router.navigate(['/home']);
      Swal.fire({
        icon: 'success',
        title: '¡Ha iniciado Sesión correctamente!',
        heightAuto: false
      })
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      if(err.message == 'Firebase: The popup has been closed by the user before finalizing the operation. (auth/popup-closed-by-user).'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Se cerró la ventana emergente antes de finalizar el Inicio de Sesión.',
          heightAuto: false
        })
      }
    
      console.log(err.message);
    })
   }
}
