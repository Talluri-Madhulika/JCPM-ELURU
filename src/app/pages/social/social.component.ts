import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  socialChannels: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSocialChannels();
  }

  loadSocialChannels(): void {
    this.http
      .get<any[]>('http://localhost:5000/api/social-channels')
      .subscribe({
        next: (data) => {
          this.socialChannels = data || [];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading social channels:', error);
          this.socialChannels = [];
          this.loading = false;
        }
      });
  }

  getIcon(channel: any): string {
    const icon = (channel.icon || '').toLowerCase();

    if (icon === 'youtube') {
      return '▶';
    }

    if (icon === 'instagram') {
      return '◎';
    }

    if (icon === 'facebook') {
      return 'f';
    }

    if (icon === 'website') {
      return '🌐';
    }

    return '◎';
  }

}