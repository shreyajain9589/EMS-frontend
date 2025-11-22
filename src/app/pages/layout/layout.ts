import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {

  authService = inject(AuthService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  user: any;

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.user = this.authService.getUser();
    this.cdr.detectChanges();
  }

  logout() {
    this.authService.logout();
    this.cdr.detectChanges();
  }

  isAdminOrManager() {
    return this.user?.role === "admin" || this.user?.role === "manager";
  }

  isEmployee() {
    return this.user?.role === "employee";
  }
}
