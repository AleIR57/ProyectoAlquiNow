import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto.service';

import { UsuarioService } from 'src/app/servicios/usuario.service';
@Component({
  selector: 'app-detail-producto',
  templateUrl: './detail-producto.component.html',
  styleUrls: ['./detail-producto.component.scss'],
})
export class DetailProductoComponent implements OnInit {
  productoRef: any;
  categoria: any;
  nombre: any;
  precio: any;
  descripcion: any;
  marca: any;
  modelo: any;
  nombreDueno: any;
  constructor(public productoService: ProductoService, private activateRoute: ActivatedRoute, public usuarioService: UsuarioService) { }

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.productoService.getProductoById(id).subscribe(res => {
    this.productoRef = res;
      this.nombre = this.productoRef.nombre;
      this.categoria = this.productoRef.categoria;
      this.precio = this.productoRef.precio;
      this.descripcion = this.productoRef.descripcion;
      this.marca = this.productoRef.marca;
      this.modelo = this.productoRef.modelo;
      console.log(this.productoRef);

      this.usuarioService.getUsuarioById('5ntV4byYBiNtpFE5THiPEEvw87k2').subscribe(res2 => {
       this.nombreDueno = res2;
       
      });
    })
  }

}
