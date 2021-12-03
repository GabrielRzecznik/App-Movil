import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})

export class PublicacionesComponent implements OnInit {
  formularioAutomovil!:FormGroup;
  panelOpenState = false;
  automovilesPublicados:any;
  publicar = false;
  modoOscuro = false;
  modo = "Modo oscuro";

  selectFormControl = new FormControl('', Validators.required);

  constructor(private api:ApiService, private fb:FormBuilder) {
    this.formularioAutomovil = this.fb.group({
      patente: ["",[Validators.required, Validators.minLength(7), Validators.maxLength(9)]],
      marca: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      modelo: ["",[Validators.required, Validators.minLength(1), Validators.maxLength(24)]],
      version: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      color: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      estado: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      cambio: ["",Validators.required],
      combustible: ["",Validators.required],
      valor:["",[Validators.required, Validators.min(4), Validators.max(6), Validators.pattern(/^[0-9]\d*$/)]],
      kilometraje: ["",[Validators.required, Validators.minLength(1), Validators.maxLength(24)]],
      anio: ["",[Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      //propietario: ["",Validators.required]
    });
  }

  ngOnInit(): void {
    this.CargarPublicaciones();
    this.api.recargarPagina.subscribe(resp => {
      console.log(resp);
      this.CargarPublicaciones();
    })
  }

  subir(){
    this.publicar = true;
  }

  noSubir(){
    this.publicar = false;
  }

  modos(){
    if (this.modoOscuro) {
      this.modoOscuro = false;
      this.modo = "Modo oscuro";
    }else{
      this.modoOscuro = true;
      this.modo = "Modo claro";
    }
    return this.modo;
  }

  CargarPublicaciones(){
    this.api.traerValor().subscribe(resp => {console.log(resp)
      this.automovilesPublicados = resp
      this.automovilesPublicados = this.automovilesPublicados.sort((a:any, b:any)=>a.patente > b.patente ? 1:-1)
    });
  }

  CrearAutomovil(){
    if (this.formularioAutomovil.invalid) {
      return;
    }
    console.log(this.formularioAutomovil.value);
    this.api.PublicarAutomovil(
      this.formularioAutomovil.value.patente,
      this.formularioAutomovil.value.marca,
      this.formularioAutomovil.value.modelo,
      this.formularioAutomovil.value.version,
      this.formularioAutomovil.value.color,
      this.formularioAutomovil.value.estado,
      this.formularioAutomovil.value.cambio,
      this.formularioAutomovil.value.combustible,
      this.formularioAutomovil.value.valor,
      this.formularioAutomovil.value.kilometraje,
      this.formularioAutomovil.value.anio).subscribe(resp => {
        console.log(resp);
        this.automovilesPublicados.push(resp);
        this.CargarPublicaciones();
      });    
  }

  EliminarAutomovil(patente:string){
    //Selecciona el campo para eliminar
    //console.log(patente);
    this.api.EliminarAutomovil(patente).subscribe(resp => {
      console.log(resp);
    this.CargarPublicaciones();
    });
  }

  //Validaciónes
  patente = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);
  marca = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);
  modelo = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);
  version = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);
  color = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);
  estado = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);
  cambio = new FormControl('', Validators.required);
  combustible = new FormControl('', Validators.required);
  valor = new FormControl('', [Validators.required, Validators.min(4), Validators.max(6), Validators.pattern(/[0-9]/)]);

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  
  getErrorMessagePatente() {
    if (this.patente.hasError('required')) {
      return 'Ingrese una patente valida';
    }
    return this.patente.hasError('patente') ? 'La patente ingresada no es valida' : '';
  }

  getErrorMessageMarca() {
    if (this.marca.hasError('required')) {
      return 'Ingrese la marca del automovil';
    }
    return this.marca.hasError('patente') ? 'La marca ingresada no es valida' : '';
  }

  getErrorMessageModelo() {
    if (this.modelo.hasError('required')) {
      return 'Ingrese el modelo del automovil';
    }
    return this.modelo.hasError('patente') ? 'El modelo ingresado no es valido' : '';
  }
  
  getErrorMessageVersion() {
    if (this.version.hasError('required')) {
      return 'Ingrese la version del automovil';
    }
    return this.version.hasError('version') ? 'La version ingresado no es valido' : '';
  }

  getErrorMessageColor() {
    if (this.color.hasError('required')) {
      return 'Ingrese el color del automovil';
    }
    return this.color.hasError('color') ? 'El color ingresado no es valido' : '';
  }

  getErrorMessageEstado() {
    if (this.color.hasError('required')) {
      return 'Ingrese el estado del automovil';
    }
    return this.color.hasError('color') ? 'El estado ingresado no es valido' : '';
  }

  getErrorMessageValor() {
    if (this.color.hasError('required')) {
      return 'Ingrese el valor del automovil';
    }
    return this.color.hasError('valor') ? 'El valor ingresado no es valido' : '';
  }
  
}