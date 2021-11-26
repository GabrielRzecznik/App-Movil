import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aplicacionMovil';
  myControl = new FormControl();
  options: string[] = ['Gabriel', 'Alan', 'Agustin'];
  filteredOptions!: Observable<string[]>;
  hide = true;

  ngOnInit() {
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
