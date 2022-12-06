import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  login(loginUser:any){
    this.authService.login(loginUser.email, loginUser.password);
  }
  
  signInWithGoogle(){
    this.authService.googleSignIn();
  }


}
