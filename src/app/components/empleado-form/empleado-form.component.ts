import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Empleado } from '../../models/empleado';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss']
})
export class EmpleadoFormComponent implements OnInit {

  buscarEmpForm: FormGroup;
  crearEmpForm: FormGroup;
  empleados: Empleado[] = [];
  displayedColumns: string[] = ["id", "name"];

  constructor(private empService: EmpleadosService,
              private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }


  createForm() {
    this.buscarEmpForm = this.fb.group({
      id: ['']
    });

    this.crearEmpForm = this.fb.group({
      id: ['', Validators.required],
      name: [''],
      contractTypeName: ['', Validators.required]
    })
  }

  buscarEmp() {
    var { id }  = this.buscarEmpForm.value;
    if (id) {
      this.empService.getOneEmpleado(id)
        .subscribe(res => {
          console.log(res);
          if (res.success) {
            this.empleados.push(res.data)
          } else {
            // Mostrar un snackBar con el msg
          }
        });

    } else {
      this.empService.getAllEmpleados()
        .subscribe(res => {
          console.log(res);
          if (res.data.lenght == 0) {
            // Mostrar un snackBar con emps=0  
          }
          this.empleados = res.data;
        });
    }
    
    
  }

}
