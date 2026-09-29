import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  announcements: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAnnouncements();
  }

  getAnnouncements(): void {
    this.http
      .get<any[]>('http://localhost:5000/api/announcements')
      .subscribe({
        next: (data) => {
          this.announcements = data;
        },
        error: (error) => {
          console.error(
            'Error fetching announcements:',
            error
          );
        }
      });
  }

}