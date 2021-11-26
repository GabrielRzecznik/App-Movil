import { Component, OnInit } from '@angular/core';
import { Automovil } from 'src/app/Clase/automovil';
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
      valor:["",[Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
      kilometraje: ["",[Validators.required, Validators.minLength(1), Validators.maxLength(24)]],
      anio: ["",[Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      //propietario: ["",Validators.required]
    });
  }

  ngOnInit(): void {
    this.CargarPublicaciones();
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
    this.api.traerValor().subscribe(resp => this.automovilesPublicados = resp);
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

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
