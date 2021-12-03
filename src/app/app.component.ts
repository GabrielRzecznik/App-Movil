import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from './servicios/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'aplicacionMovil';
  myControl = new FormControl();
  options: string[] = ['Gabriel', 'Alan', 'Agustin'];
  filteredOptions!: Observable<string[]>;
  hide = true;

  constructor(private activateRouter:ActivatedRoute, private apiservice:ApiService){

  }
  
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.activateRouter.params.subscribe(resp => console.log(resp));
    //this.apiservice.recargarPagina.subscribe(resp => {this.isLogin = resp});
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  //Validaciónes
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]);

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
}
