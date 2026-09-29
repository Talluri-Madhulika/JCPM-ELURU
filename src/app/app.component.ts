import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'jcpm';

  user: any = {};

  private userSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.userSubscription =
      this.authService.user$.subscribe((user) => {

        this.user = user || {};

      });

  }

  getInitial(): string {

    const name =
      this.user?.name ||
      this.user?.email ||
      'J';

    return name
      .trim()
      .charAt(0)
      .toUpperCase();
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
}