import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  registerUser = {
    email: '',
    password: ''
  }

  
  show: boolean = false;
  constructor(private authService:AuthService) { }

  ngOnInit() {}

  register(registerUser:any){
    if(registerUser.password != ''){
      this.authService.register(registerUser.email, registerUser.password);
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo de contraseña no puede quedar vacío.',
        heightAuto: false
      })
    }
    
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
