import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorRutaComponent } from './componentes/error-ruta/error-ruta.component';
import { LoginComponent } from './componentes/login/login.component';
import { PublicacionesComponent } from './componentes/publicaciones/publicaciones.component';
import { RegistroComponent } from './componentes/registro/registro.component';


const routes: Routes = [
  //Direcciónes
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'publicaciones', component: PublicacionesComponent},
  {path: '**' , component: ErrorRutaComponent},//Para cualquiera, Error 404
  {path: '' , component: LoginComponent},
  //{path: 'app', component: PrimerComponenteComponent, canActivate: [CustodiaGuard]},      ->      canActivate: [CustodiaGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



