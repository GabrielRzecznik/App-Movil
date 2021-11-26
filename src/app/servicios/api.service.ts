//Conectar Server
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }
  traerValor() {
    return this.http.get('https://parcial-edi-backend.herokuapp.com/Automoviles/listaAutomovil');
  }

  PublicarAutomovil(patente: string, marca: string, modelo: string, version: string, color: string, estado: string, cambio: string, combustible: string, valor: number, kilometraje: number, anio: number) {
    const body = { patente, marca, modelo, version, color, estado, cambio, combustible, valor, kilometraje, anio, propietario:"gabriel@gmail.com" };
    return this.http.post('https://parcial-edi-backend.herokuapp.com/Automoviles/publicarAutomovil', body);
  }

  EliminarAutomovil(patente: string) {
    const body = { patente };
    return this.http.delete('https://parcial-edi-backend.herokuapp.com/Automoviles/eliminarAutomovil', { body });
  }

  RegistrarUsuario(nombre: string, apellido: string, correo: string, contraseña: string, provincia: string, edad: number) {
    const body = { nombre, apellido, correo, contraseña, provincia, edad};
    return this.http.post('https://parcial-edi-backend.herokuapp.com/Usuarios/registrarUsuario', body);
  }

  BuscarUsuario(correo: string, contraseña: string) {
    const body = {correo, contraseña};
    return this.http.post('https://parcial-edi-backend.herokuapp.com/Usuarios/buscarUsuario', body);
  }

  traerValoresPost(): Observable<any> {
    //Post                      .toPromise()
    return this.http.post('', {});
  }
}
