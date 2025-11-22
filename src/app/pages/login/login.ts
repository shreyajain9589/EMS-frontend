import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush   // 🔥 OnPush enabled
})
export class Login {

  loginObj = {
    email: "",
    password: ""
  };

  http = inject(HttpClient);
  router = inject(Router);
  auth = inject(AuthService);
  cdr = inject(ChangeDetectorRef);     // 🔥 Needed for UI refresh

  onLogin() {

    this.loginObj.email = this.loginObj.email.trim();
    this.loginObj.password = this.loginObj.password.trim();

    console.log("Sending:", this.loginObj);

    this.http.post("http://localhost:5000/api/auth/login", this.loginObj)
      .subscribe({
        next: (res: any) => {

          if (res.token) {
            this.auth.saveAuth(res);

            // 🔥 ensure UI updates before navigation
            this.cdr.detectChanges();

            this.router.navigateByUrl('dashboard');
          } else {
            alert(res.message);
          }
        },

        error: (err) => {
          alert(err.error?.message || "Login failed");
          this.cdr.detectChanges();     // 🔥 update UI after error
        }
      });
  }
}
