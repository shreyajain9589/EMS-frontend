import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storageKey = "employeeApp";

  constructor() {}

  // Save login response (token + user)
  saveAuth(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // Get full auth object
  getAuth() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  // Get only token
  getToken() {
    return this.getAuth()?.token || null;
  }

  // Get logged in user
  getUser() {
    return this.getAuth() || null;
  }

  // Logout user
  logout() {
    localStorage.removeItem(this.storageKey);
    window.location.href = "/login";
  }
}
