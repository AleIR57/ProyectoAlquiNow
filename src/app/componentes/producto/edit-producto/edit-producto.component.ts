import { Component, OnInit } from '@angular/core';

import { ProductoService } from 'src/app/servicios/producto.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.scss'],
})
export class EditProductoComponent implements OnInit {
  public editForm: FormGroup;
  productoRef: any;
  constructor(public productoService: ProductoService, public formBuilder: FormBuilder, private activateRoute: ActivatedRoute, private router: Router) { 
   
    this.editForm = this.formBuilder.group({
      nombre: [''],
      descripcion: [''],
      precio: [''],
      cantidad: [''],
      fechaNuevoAlquiler: [''],
      fechaDevolucionAlquiler: [''],
      tiempoAlquiler: [''],
      idUsuarioPoseedor: [''],
      idUsuarioAlquilador: [''],
      fotos: [''],
      video: [''],
      categoria: ['']
    })
  }

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.productoService.getProductoById(id).subscribe(res => {
      this.productoRef = res;
      this.editForm = this.formBuilder.group({
      nombre: [this.productoRef.nombre],
      descripcion: [this.productoRef.descripcion],
      precio: [this.productoRef.precio],
      cantidad: [this.productoRef.cantidad],
      fechaNuevoAlquiler: [this.productoRef.fechaNuevoAlquiler],
      fechaDevolucionAlquiler: [this.productoRef.fechaDevolucionAlquiler],
      tiempoAlquiler: [this.productoRef.tiempoAlquiler],
      idUsuarioPoseedor: [this.productoRef.idUsuarioPoseedor],
      idUsuarioAlquilador: [this.productoRef.idUsuarioAlquilador],
      fotos: [this.productoRef.fotos],
      video: [this.productoRef.video],
      categoria: [this.productoRef.categoria]
      });

    })
  }

  onSubmit(){
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.productoService.updateProducto(this.editForm.value, id);
    this.router.navigate(['/mostrar-producto']);
  }

}
