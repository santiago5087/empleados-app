import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { EmpleadosService } from '../../services/empleados.service';
import { flyInOut } from '../../animations/app.animation';

@Component({
  selector: 'app-empleado-delete',
  templateUrl: './empleado-delete.component.html',
  styleUrls: ['./empleado-delete.component.scss'],
  host: {
    '[@flyInOut]' : 'true', // Se aplica al padre porque es el encargado de crear/destruir los elem.
    'style': 'display: block' // Para que pueda funcionar la animación sobre el container
  },
  animations: [
    flyInOut()
    ]
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
        this.snackBar.open("An error occurred while deleting, try again", 
          "Ok!", this.snackBarConfig);
      });
  }

}
