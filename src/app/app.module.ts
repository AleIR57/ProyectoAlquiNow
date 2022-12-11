import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { RegistroComponent } from './componentes/registro/registro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordarContrasenaComponent } from './componentes/recordar-contrasena/recordar-contrasena.component';
import { CreateProductoComponent } from './componentes/producto/create-producto/create-producto.component';
import { ShowProductoComponent } from './componentes/producto/show-producto/show-producto.component';
import { EditProductoComponent } from './componentes/producto/edit-producto/edit-producto.component';
import {provideStorage, getStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { Observable, Subscriber } from 'rxjs';
import { MenuComponent } from './componentes/menu/menu.component';
import { DetailProductoComponent } from './componentes/producto/detail-producto/detail-producto.component';

@NgModule({
  declarations: [AppComponent, RegistroComponent,InicioComponent,LoginComponent, RecordarContrasenaComponent, CreateProductoComponent, ShowProductoComponent, EditProductoComponent, MenuComponent, DetailProductoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule, AngularFirestoreModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}],
  bootstrap: [AppComponent],
})
export class AppModule {}
