import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { EmpleadoCreateComponent } from './components/empleado-create/empleado-create.component';
import { EmpleadoDeleteComponent } from './components/empleado-delete/empleado-delete.component';

const routes: Routes = [
  { path: '', redirectTo: '/empleados', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadoFormComponent },
  { path: 'empleados-create', component: EmpleadoCreateComponent },
  { path: 'empleados-delete', component: EmpleadoDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
