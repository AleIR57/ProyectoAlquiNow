import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../modelos/usuario';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private angularFirestore: AngularFirestore) { }


  //Métodos para el CRUD
  getUsuarios(){
    return this.angularFirestore.collection('usuarios').snapshotChanges();
  
  }

  getUsuarioById(id){
    return this.angularFirestore.collection('usuarios', ref => ref.where('idUser', '==', id)).valueChanges();
  }

  createUsuario(usuario: Usuario){
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore.collection('usuarios').add(usuario).then((response) =>{
        console.log(response)
      },
      (error) => {
        reject(error)
      })
    })
  } 

  updateusuario(usuario: Usuario, id){
    return this.angularFirestore.collection('usuarios').doc(id).update({

      nombre: usuario.nombre,
      descripcion: usuario.rol,
      precio: usuario.calificacion,
      cantidad: usuario.idUser,
    
    });
  }

  deleteProducto(producto){
    return this.angularFirestore.collection('productos').doc(producto.id).delete();
  }

}
