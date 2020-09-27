import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Empleado } from '../../models/Empleado';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-empleado-create',
  templateUrl: './empleado-create.component.html',
  styleUrls: ['./empleado-create.component.scss']
})
export class EmpleadoCreateComponent implements OnInit {

  // Formulario
  crearEmpForm: FormGroup;

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
    this.crearEmpForm = this.fb.group({
      id: ['', Validators.required],
      name: '',
      contractTypeName: ['MonthlySalaryEmployee', Validators.required],
      roleId: [Validators.required],
      roleName: ['', Validators.required],
      roleDescription: '',
      hourlySalary: '',
      monthlySalary: ''
    });
  }

  crearEmpleado() {
    var empNuevo: Empleado = this.crearEmpForm.value;
    this.empService.createEmpleado(empNuevo)
      .subscribe((res) => {
        this.snackBarConfig.duration = 5000;
        this.snackBar.open(res.msg , "Ok!", this.snackBarConfig);
        this.reiniciarForm();
      }, err => {
        this.snackBarConfig.duration = 5000;
        this.snackBar.open("El ID del empleado ya existe, intente nuevamente" , "Ok!", this.snackBarConfig);
      });

  }

  reiniciarForm() {
    this.crearEmpForm.reset({
      contractTypeName: 'MonthlySalaryEmployee',
      id: '',
      name: '',
      roleName: '',
      roleDescription: '',
      roleId: '',
      hourlySalary: '',
      monthlySalary: ''
    });
  }
}
