import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  title = 'aplicacionMovil';
  myControl = new FormControl();
  options: string[] = ['Gabriel', 'Alan', 'Agustin'];
  filteredOptions!: Observable<string[]>;
  hide = true;
  visible = false;

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  //Validaciónes
  nombre = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);
  apellido = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);
  password2 = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);

  //Mensaje error Nombre
  getErrorMessageNombre() {
    if (this.nombre.hasError('required')) {
      return 'Ingrese su nombre';
    }
    return this.nombre.hasError('nombre') ? 'El nombre ingresado no es valido' : '';
  }
  //Mensaje error Apellido
  getErrorMessageApellido() {
    if (this.nombre.hasError('required')) {
      return 'Ingrese su apellido';
    }
    return this.apellido.hasError('apellido') ? 'El apellido ingresado no es valido' : '';
  }
  //Mensaje error Correo
  getErrorMessageCorreo() {
    if (this.email.hasError('required')) {
      return 'Ingrese un correo valido';
    }
    return this.email.hasError('email') ? 'El correo ingresado no es valido' : '';
  }
  //Mensaje error Contraseña
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Ingrese su contraseña';
    }
    return this.password.hasError('password') ? 'La contraseña ingresado no es valido' : '';
  }
  //Mensaje error Contraseña
  getErrorMessagePassword2() {
    if (this.password.hasError('required')) {
      return 'Ingrese su contraseña';
    }
    return this.password.hasError('password') ? 'La contraseña ingresado no es valido' : '';
  }

  enviar(){
    this.visible = true;
  }
  
  noEnviado(){
    this.visible = false;
  }
}
