import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

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

  getOneEmpleado(): Observable<ResponseEmpleado> {
    return this.http.get<ResponseEmpleado>(`${this.API_URI}empleados`);
  }


  getAllEmpleados(id: number): Observable<ResponseEmpleado> {
    return this.http.get<ResponseEmpleado>(`${this.API_URI}empleados/${id}`);
  }
}
