import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const currentUser = this.authService.getUser();

    if (currentUser) {
      this.user = currentUser;
    } else {
      this.user = {};
    }
  }

  getInitial(): string {
    const name =
      this.user?.name ||
      this.user?.email ||
      'J';

    return name.trim().charAt(0).toUpperCase();
  }

  getAvatarGradient(): string {

    const name =
      this.user?.name ||
      this.user?.email ||
      'JCPM';

    let total = 0;

    for (let i = 0; i < name.length; i++) {
      total += name.charCodeAt(i);
    }

    const gradients = [
      'linear-gradient(135deg, #8e7dff, #c4b5fd)',
      'linear-gradient(135deg, #ff7eb3, #ffb6d5)',
      'linear-gradient(135deg, #5bbcff, #9ddcff)',
      'linear-gradient(135deg, #62d9a8, #a8efd0)',
      'linear-gradient(135deg, #ff9f68, #ffd0ad)',
      'linear-gradient(135deg, #9b8cff, #e0aaff)',
      'linear-gradient(135deg, #55c7c0, #9de9e4)',
      'linear-gradient(135deg, #f28bb3, #ffc1d6)'
    ];

    return gradients[total % gradients.length];
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}