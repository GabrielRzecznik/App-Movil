import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-ruta',
  templateUrl: './error-ruta.component.html',
  styleUrls: ['./error-ruta.component.css']
})


export class ErrorRutaComponent implements OnInit {
  URLactual = window.location;

  constructor() { }

  ngOnInit(): void {
  }

  atras(){
    return history.go(-1);
  }
}
