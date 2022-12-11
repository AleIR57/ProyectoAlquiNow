import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from '../modelos/producto';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private angularFirestore: AngularFirestore, private router: Router) { }


  //Métodos para el CRUD
  getProductos(){
    return this.angularFirestore.collection('productos').snapshotChanges()
  }

  getProductoById(id){
    return this.angularFirestore.collection('productos').doc(id).valueChanges();
  }

  createProducto(producto: Producto){
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore.collection('productos').add(producto).then((response) =>{
  
        Swal.fire({
          icon: 'success',
          title: '¡Producto creado correctamente!',
          heightAuto: false
        })
      },
      (error) => {
        reject(error)
      })
    })
  } 

  updateProducto(producto: Producto, id){
    return this.angularFirestore.collection('productos').doc(id).update({

      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: producto.cantidad,
      fechaNuevoAlquiler: producto.fechaNuevoAlquiler,
      fechaDevolucionAlquiler: producto.fechaDevolucionAlquiler,
      tiempoAlquiler: producto.tiempoAlquiler,
      idUsuarioPoseedor: producto.idUsuarioPoseedor,
      idUsuarioAlquilador: producto.idUsuarioAlquilador,
      fotos: producto.fotos,
      video: producto.video,
      categoria: producto.categoria,
      modelo: producto.modelo,
      marca: producto.marca,
      estado: producto.estado,
    });
  }

  deleteProducto(producto){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      heightAuto: false,

      denyButtonText: `Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       
       
      } else if (result.isDenied) {
        this.angularFirestore.collection('productos').doc(producto.id).delete();
         Swal.fire({heightAuto: false, title: '¡Eliminado correctamente!', icon: 'success'})

      }
    })
    
    // return this.angularFirestore.collection('productos').doc(producto.id).delete();
  }

}
