import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService
      .login(this.email, this.password)
      .subscribe({
        next: (response: any) => {

          this.authService.saveLoginData(response);

          this.loading = false;

          alert('Login successful!');

          if (response.user?.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },

        error: (error) => {

          this.loading = false;

          this.errorMessage =
            error.error?.message ||
            'Invalid email or password.';
        }
      });
  }
}