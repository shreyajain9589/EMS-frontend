import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  http = inject(HttpClient);
  auth = inject(AuthService);

  API_URL = "https://ems-backend-1-a9qa.onrender.com/api/departments";

  private getHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${this.auth.getToken()}`
    }
  };
}


  getAllDepartments() {
  return this.http.get(this.API_URL, this.getHeaders()).pipe(
    tap(res => console.log("DEPARTMENT API RESPONSE:", res))
  );
}


  addDepartment(data: any) {
    return this.http.post(this.API_URL, data, this.getHeaders());
  }

  updateDepartment(id: string, data: any) {
    return this.http.put(`${this.API_URL}/${id}`, data, this.getHeaders());
  }

  deleteDepartment(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`, this.getHeaders());
  }
}
