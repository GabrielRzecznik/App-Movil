import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Automovil } from 'src/app/Clase/automovil';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent implements OnInit {
  formularioAutomovil!:FormGroup;
  panelOpenState = false;
  automovilesPublicados:any[]=[];
  publicar = false;
  modoOscuro = false;
  modo = "Modo oscuro";
  isLogin = false;
  
  pub = false;
  per = false;
  
  
  pubOper = "";


  constructor(private api:ApiService, private router: Router, private fb:FormBuilder, private location:Location, private activateRouter:ActivatedRoute, private cdRef:ChangeDetectorRef) {
    
    this.formularioAutomovil = this.fb.group({
      patente: ["",[Validators.required, Validators.minLength(7), Validators.maxLength(9)]],
      marca: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      modelo: ["",[Validators.required, Validators.minLength(1), Validators.maxLength(24)]],
      version: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      color: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      estado: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      cambio: ["",Validators.required],
      combustible: ["",Validators.required],
      valor:["",[Validators.required, Validators.minLength(3), Validators.maxLength(7), Validators.pattern(/^[0-9]\d*$/)]],
      kilometraje: ["",[Validators.required, Validators.minLength(1), Validators.maxLength(7), Validators.pattern(/^[0-9]\d*$/)]],
      anio: ["",[Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^[0-9]\d*$/)]],
      //propietario: ["",Validators.required]
    });
  }
  
  perfil_publicaciones(){
    if (this.pub) {
      this.pubOper = "Mi perfil";
    }else{
      this.pubOper = "Publicaciones";
    }
  }

  ngOnInit(): void { 
    //this.api.verificarLogin().subscribe(resp => console.log(resp))
    console.log(this.isLogin);
    this.api.recargarPagina.subscribe(resp => {this.isLogin = resp});
    console.log(this.isLogin);
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
    valor = new FormControl('', [Validators.required, Validators.min(3), Validators.max(7), Validators.pattern(/^[0-9]\d*$/)]);
    kilometraje = new FormControl('', [Validators.required, Validators.min(1), Validators.max(7), Validators.pattern(/^[0-9]\d*$/)]);
    anio = new FormControl('', [Validators.required, Validators.min(4), Validators.max(4), Validators.pattern(/^[0-9]\d*$/)]);
  
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  
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
          this.api.recargarPagina.emit(true);
          this.automovilesPublicados.push(resp);
        });  
    }
    
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

    getErrorMessageKilometraje() {
      if (this.color.hasError('required')) {
        return 'Ingrese el kilometraje del automovil';
      }
      return this.color.hasError('kilometraje') ? 'El kilometraje ingresado no es valido' : '';
    }

    getErrorMessageAnio() {
      if (this.color.hasError('required')) {
        return 'Ingrese el año del automovil';
      }
      return this.color.hasError('anio') ? 'El año ingresado no es valido' : '';
    }

    perfil(){
      this.router.navigate(['/perfil']);
    }

    salir(){
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }

}
