import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Empleado } from '../models/Empleado';

interface ResponseEmpleado {
  success: boolean;
  data: any;
  msg: string;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  API_URI = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getOneEmpleado(id: number): Observable<ResponseEmpleado> {
    return this.http.get<ResponseEmpleado>(`${this.API_URI}empleados/${id}`);
  }

  getAllEmpleados(): Observable<ResponseEmpleado> {
    return this.http.get<ResponseEmpleado>(`${this.API_URI}empleados`);
  }

  createEmpleado(emp: Empleado): Observable<ResponseEmpleado> {
    return this.http.post<ResponseEmpleado>(`${this.API_URI}empleados`, emp);
  }

  deleteEmpleado(id: number): Observable<ResponseEmpleado> {
    return this.http.delete<ResponseEmpleado>(`${this.API_URI}empleados/${id}`);
  }
  
}
