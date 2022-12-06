import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

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
  constructor(private authService:AuthService) { }

  ngOnInit() {}

  register(registerUser:any){
    this.authService.register(registerUser.email, registerUser.password);
  }
}
