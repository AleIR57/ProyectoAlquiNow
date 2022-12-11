import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/servicios/usuario.service';



@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.scss'],
})
export class CreateProductoComponent implements OnInit {
  public productoForm: FormGroup;

  myImage!:Observable<any>;

  base64code: any = [];
  video64code: any;

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];

    console.log(file);

    this.convertToBase64(file);
  }

  convertToBase64(file: File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })

    observable.subscribe((d) => {
      
      this.myImage = d;
      
      if(d.includes('video')){
        this.video64code = d;
        console.log('es un video');
     
      }
      else{
        this.base64code.push(d);
        this.productoForm.patchValue({
          fotos: this.base64code
        })
      }
      console.log(this.video64code);
      console.log(this.base64code);
    })
  }

  readFile(file: File, subscriber: Subscriber<any>){
    const filereader = new FileReader();

    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);

      subscriber.complete();
    }

    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }

  constructor(
    public productoService: ProductoService,
    public formBuilder: FormBuilder,
    public router: Router,
    public usuarioService: UsuarioService,
  ) {
    console.log();
    let usuarioLogeado = localStorage.getItem('user');
    if(usuarioLogeado != undefined){
      let info = {};
      console.log();
      usuarioService.getUsuarioById(JSON.parse(usuarioLogeado)['uid']).subscribe(res => {
   
        info['uid'] = JSON.parse(usuarioLogeado)['uid'];
        info['nombre'] = res[0]['nombre'];

       
        this.productoForm.patchValue({
          idUsuarioPoseedor: info
        })

      });
    
      console.log()
    }
   
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
      categoria: [''],
      modelo: [''],
      marca: [''],
      estado: ['En espera de aprobación']

    })
    
   }

  ngOnInit() {}

  onSubmit(){
    this.router.navigate(['mostrar-producto']);
    this.productoService.createProducto(this.productoForm.value);
  }

  mostrarFotosYVideos(){
    console.log('Hola');
    let txt = '';
    if(this.base64code.length > 0){
      txt += `<h5>Imágenes Adjuntas</h5>
            <div style ="display:flex; flex-direction: row; flex-wrap: wrap; justify-content: space-evenly;">
            `

    for(let i = 0; i < this.base64code.length; i++){
      txt += `<div style = "border: 1px solid lightgray; border-radius: 5px; margin-right: 1%; padding: 5px; margin-bottom: 2%; margin-top: 2%;"><img src = "${this.base64code[i]}" style = "width: 5em; height: 5em;"></div>`
    }
            txt +=`</div>
    `;
    }
    else{
      txt +=`<h5>No existen imágenes adjuntas para el producto que desea crear</h5>`;
    }

   console.log(this.video64code);
    if(this.video64code != undefined){
      txt += `<h5>Video Adjunto</h5>
      <div>
      <video width="320" height="240" controls>
        <source src="${this.video64code}" type="video/mp4">
        <source src="movie.ogg" type="video/ogg">
      Your browser does not support the video tag.
      </video>
      </div>`
    }
    else{
      txt +=`<h5>No existe video adjunto para el producto que desea crear</h5>`;
    }
    Swal.fire({
      title: '',
      
      html: txt,

  
      heightAuto: false,
      
    })
  }

}
