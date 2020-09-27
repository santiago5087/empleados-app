import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss']
})
export class EmpleadoFormComponent implements OnInit {

  // Formulario
  buscarEmpForm: FormGroup;

  // Datos para graficar la tabla
  empleados = new MatTableDataSource([]);
  displayedColumns: string[] = ["id", "name", "contractTypeName", "roleId", "roleDescription",
                                "hourlySalary", "monthlySalary", "annualSalary"];
  
  // Objeto de config. de Snack Bar
  snackBarConfig = new MatSnackBarConfig()

  constructor(private empService: EmpleadosService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) { 
    this.createForm();
  }

  ngOnInit(): void {
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
          this.snackBar.open("Ha ocurrido un error en la consulta del empleado, intente nuevamente",
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
          this.snackBar.open("Ha ocurrido un error en la consulta de los empleados, intente nuevamente", 
            "Ok!", this.snackBarConfig);
        });
    }

  }

  // Función que filtra los datos por medio del valor ingresado por el usuario
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empleados.filter = filterValue.trim().toLowerCase();
  }

}
