import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { CreateProductoComponent } from './componentes/producto/create-producto/create-producto.component';
import { EditProductoComponent } from './componentes/producto/edit-producto/edit-producto.component';
import { ShowProductoComponent } from './componentes/producto/show-producto/show-producto.component';
import { RecordarContrasenaComponent } from './componentes/recordar-contrasena/recordar-contrasena.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { VerificarCorreoComponent } from './componentes/verificar-correo/verificar-correo.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio', component:InicioComponent
  },
  {
    path: 'inicio-sesion', component:LoginComponent
  }
  ,
  {
    path: 'registro', component:RegistroComponent
  },
  {
    path: 'verificar-correo', component:VerificarCorreoComponent
  },
  {
    path: 'recordar-contrasena', component:RecordarContrasenaComponent
  },
  {
    path: 'mostrar-producto', component: ShowProductoComponent
  },
  {
    path: 'crear-producto', component: CreateProductoComponent
  },
  {
    path: 'editar-producto/:id', component: EditProductoComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
