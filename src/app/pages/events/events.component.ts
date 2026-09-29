import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  announcements: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.http
      .get<any[]>('http://localhost:5000/api/announcements')
      .subscribe({
        next: (data) => {
          this.announcements = data || [];
        },
        error: () => {
          this.announcements = [];
        }
      });
  }
}