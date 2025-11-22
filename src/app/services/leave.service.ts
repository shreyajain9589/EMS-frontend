import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  http = inject(HttpClient);
  auth = inject(AuthService);

 API_URL = "https://ems-backend-1-a9qa.onrender.com/api/leaves";

  constructor() {}

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`,
      "Content-Type": "application/json"
    });
  }

  getAllLeaves() {
    return this.http.get(this.API_URL, { headers: this.getHeaders() });
  }

  getUserLeaves(userId: string) {
    return this.http.get(`${this.API_URL}/user/${userId}`, { headers: this.getHeaders() });
  }

  applyLeave(data: any) {
    return this.http.post(this.API_URL, data, { headers: this.getHeaders() });
  }

  updateLeaveStatus(id: string, status: string) {
    const url =
      status === "approved"
        ? `${this.API_URL}/${id}/approve`
        : `${this.API_URL}/${id}/reject`;

    return this.http.put(url, {}, { headers: this.getHeaders() });
  }
}
