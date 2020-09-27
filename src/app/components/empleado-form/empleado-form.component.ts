import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Empleado } from '../../models/Empleado';
import { EmpleadosService } from '../../services/empleados.service';
import { flyInOut } from '../../animations/app.animation';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss'],
  host: {
    '[@flyInOut]' : 'true', // Se aplica al padre porque es el encargado de crear/destruir los elem.
    'style': 'display: block' // Para que pueda funcionar la animación sobre el container
  },
  animations: [
    flyInOut()
    ]
})
export class EmpleadoFormComponent {

  // Formulario
  buscarEmpForm: FormGroup;

  // Datos para graficar la tabla
  empleados = new MatTableDataSource<Empleado>([]);
  displayedColumns: string[] = ["id", "name", "contractTypeName", "roleId", "roleDescription",
                                "hourlySalary", "monthlySalary", "annualSalary"];
  
  // Objeto de config. de Snack Bar
  snackBarConfig = new MatSnackBarConfig()

  constructor(private empService: EmpleadosService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) { 
    this.createForm();
  }

  createForm() {
    this.buscarEmpForm = this.fb.group({
      id: [null]
    });
  }

  buscarEmp() {
    var { id }  = this.buscarEmpForm.value;
    if (id) {
      this.empService.getOneEmpleado(id)
        .subscribe(res => {
          console.log(res); 

          if (res.success) {
            this.empleados.data = [res.data];
          } else {
            this.empleados.data = [];
          }

          // El Snack Bar durará 5s o hasta que el usuario lo cierre
          this.snackBarConfig.duration = 5000;
          this.snackBar.open(res.msg , "Ok!", this.snackBarConfig);
        }, err => {
          this.snackBarConfig.duration = 5000;
          this.snackBar.open("An error occurred while getting employees, try again",
             "Ok!", this.snackBarConfig);
        });

    } else {
      this.empService.getAllEmpleados()
        .subscribe(res => {
          console.log(res);
          this.empleados.data = res.data;

          // El Snack Bar durará 5s o hasta que el usuario lo cierre
          this.snackBarConfig.duration = 5000;
          this.snackBar.open(res.msg , "Ok!", this.snackBarConfig);
        }, err => {
          this.snackBarConfig.duration = 5000;
          this.snackBar.open("An error occurred while getting employees, try again", 
            "Ok!", this.snackBarConfig);
        });
    }

  }

  // Función que filtra los datos por medio del valor ingresado por el usuario
  // IMPORTANTE: Los datos que salen en la tabla de la forma: "No ... provided" son en realidad nulos (null)
  // por lo que el filter no los detecta, para ver filas que tienen valores nulos, se tiene que 
  // poner "null" en el filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empleados.filter = filterValue.trim().toLowerCase();
  }

}
