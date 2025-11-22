import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  http = inject(HttpClient);
  auth = inject(AuthService);

  API_URL = "http://localhost:5000/api/employees";

  private getHeaders() {
    const token = this.auth.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  getAllEmployees() {
    return this.http.get(this.API_URL, this.getHeaders());
  }

  getEmployeeById(id: string) {
    return this.http.get(`${this.API_URL}/${id}`, this.getHeaders());
  }

  addEmployee(data: any) {
    return this.http.post(this.API_URL, data, this.getHeaders());
  }

  updateEmployee(id: string, data: any) {
    return this.http.put(`${this.API_URL}/${id}`, data, this.getHeaders());
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`, this.getHeaders());
  }
}
