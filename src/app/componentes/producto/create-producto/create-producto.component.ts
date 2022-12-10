import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.scss'],
})
export class CreateProductoComponent implements OnInit {
  public productoForm: FormGroup
  constructor(
    public productoService: ProductoService,
    public formBuilder: FormBuilder,
    public router: Router,
  ) {
    this.productoForm = this.formBuilder.group({
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

  ngOnInit() {}

  onSubmit(){
    this.productoService.createProducto(this.productoForm.value);
    this.router.navigate(['']);
  }

}
