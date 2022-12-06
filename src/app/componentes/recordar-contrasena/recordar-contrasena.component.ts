import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-recordar-contrasena',
  templateUrl: './recordar-contrasena.component.html',
  styleUrls: ['./recordar-contrasena.component.scss'],
})
export class RecordarContrasenaComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}
  email = '';
  recuperarContrasena(){
    this.authService.recordarContrasena(this.email);
    this.email = '';
  }

}
