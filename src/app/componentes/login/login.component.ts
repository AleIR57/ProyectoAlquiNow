import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  LoginUser = {
    email: '',
    password: ''
  }

  show: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    let inputPassword = (<HTMLInputElement>document.getElementById('exampleInputPassword1'));
    inputPassword.value = '';
  }

  login(loginUser:any){
    this.authService.login(loginUser.email, loginUser.password);
   
   
  }
  
  signInWithGoogle(){
    this.authService.googleSignIn();
  }

  mostrarContrasena(){
    if(this.show == false){
      this.show = true;
    }
    else if(this.show == true){
      this.show = false;
    }
    if(this.show){
      let inputPassword = document.getElementById('exampleInputPassword1');
      let imagenPassword = document.getElementById('imagenPassword');
      imagenPassword?.setAttribute('src', '../../../assets/icon/ojo-abierto.png');
      inputPassword?.setAttribute('type', 'text');
    }
    else if(!this.show){
      let inputPassword = document.getElementById('exampleInputPassword1');
      let imagenPassword = document.getElementById('imagenPassword');
      imagenPassword?.setAttribute('src', '../../../assets/icon/ojo-cerrado.png');
      inputPassword?.setAttribute('type', 'password');
    }
  }


}
