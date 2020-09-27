import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-empleado-delete',
  templateUrl: './empleado-delete.component.html',
  styleUrls: ['./empleado-delete.component.scss']
})
export class EmpleadoDeleteComponent implements OnInit {

  deleteEmpForm: FormGroup;

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
    this.deleteEmpForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  borrarEmp() {
    var { id }  = this.deleteEmpForm.value;
    this.empService.deleteEmpleado(id)
      .subscribe((res) => {
        // El Snack Bar durará 5s o hasta que el usuario lo cierre
        this.snackBarConfig.duration = 5000;
        this.snackBar.open(res.msg, "Ok!", this.snackBarConfig);
      }, err => {

        this.snackBarConfig.duration = 5000;
        this.snackBar.open("Ha ocurrido un error en el borrado, intente nuevamente", 
          "Ok!", this.snackBarConfig);
      });
  }

}
