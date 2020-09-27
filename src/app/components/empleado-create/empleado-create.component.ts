import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Empleado } from '../../models/Empleado';
import { EmpleadosService } from '../../services/empleados.service';
import { flyInOut } from '../../animations/app.animation';

@Component({
  selector: 'app-empleado-create',
  templateUrl: './empleado-create.component.html',
  styleUrls: ['./empleado-create.component.scss'],
  host: {
    '[@flyInOut]' : 'true', // Se aplica al padre porque es el encargado de crear/destruir los elem.
    'style': 'display: block' // Para que pueda funcionar la animación sobre el container
  },
  animations: [
    flyInOut()
    ]
})
export class EmpleadoCreateComponent {

  // Formulario
  crearEmpForm: FormGroup;

  // Objeto de config. de Snack Bar
  snackBarConfig = new MatSnackBarConfig()

  constructor(private empService: EmpleadosService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { 
      this.createForm();
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
        this.snackBar.open("Employee ID already exists, try again" , "Ok!", this.snackBarConfig);
      });

  }

  reiniciarForm() {
    // Reinicia el formulario y reestablece sus valores por defecto
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
