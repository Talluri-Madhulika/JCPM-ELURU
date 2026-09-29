import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: any[] = [];
  filteredMessages: any[] = [];
  searchText = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.http
      .get<any[]>('http://localhost:5000/api/messages')
      .subscribe({
        next: (data) => {
          this.messages = data || [];
          this.filteredMessages = this.messages;
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
        }
      });
  }

  searchMessages(): void {

    const query = this.searchText.trim().toLowerCase();

    if (!query) {
      this.filteredMessages = this.messages;
      return;
    }

    this.filteredMessages = this.messages.filter(message => {

      const text = [
        message.title,
        message.content,
        message.category
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return text.includes(query);
    });
  }

  openMessage(message: any): void {

    this.router.navigate(['/content-detail'], {
      queryParams: {
        type: 'messages',
        id: message._id,
        from: '/messages'
      }
    });

  }

  toggleFavorite(message: any, event: Event): void {

    event.stopPropagation();

    this.favoriteService.toggleFavorite(
      message,
      'messages'
    );
  }

  isFavorite(message: any): boolean {

    return this.favoriteService.isFavorite(
      message._id,
      'messages'
    );

  }
}