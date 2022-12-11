import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelos/producto';

import { ProductoService } from 'src/app/servicios/producto.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.scss'],
})
export class ShowProductoComponent implements OnInit {
  Productos: Producto[];
  constructor(private productoService: ProductoService, private menuCtrl: MenuController) { }

  ngOnInit() {

    this.productoService.getProductos().subscribe( (res) => {
      this.Productos = res.map( (e) =>{
        return{
          id: e.payload.doc.id,
          ... (e.payload.doc.data() as Producto)
        }
      })
    })
    
  }



  deleteRow = (producto) => this.productoService.deleteProducto(producto);

  toggleMenu(){
    this.menuCtrl.toggle();
  }

}
