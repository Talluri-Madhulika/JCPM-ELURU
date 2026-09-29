import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  greeting = '';

  dailyPromise: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.setGreeting();
    this.loadDailyPromise();
  }

  setGreeting(): void {
    const hour = new Date().getHours();

    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 17) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Night';
    }
  }

  loadDailyPromise(): void {
    this.http
      .get<any>('http://localhost:5000/api/daily-promises/today')
      .subscribe({
        next: (data) => {
          this.dailyPromise = data;
        },
        error: (error) => {
          console.log('No Daily Promise found:', error);
          this.dailyPromise = null;
        }
      });
  }
}