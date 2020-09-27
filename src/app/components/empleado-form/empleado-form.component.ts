import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss']
})
export class EmpleadoFormComponent implements OnInit {

  buscarEmpForm: FormGroup;
  crearEmpForm: FormGroup;
  empleados: Empleado[] = [];

  constructor(private fb: FormBuilder) { 
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
    console.log("Botón funciona")
  }

}
