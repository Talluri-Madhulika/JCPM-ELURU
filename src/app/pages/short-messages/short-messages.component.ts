import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-short-messages',
  templateUrl: './short-messages.component.html',
  styleUrls: ['./short-messages.component.css']
})
export class ShortMessagesComponent implements OnInit {

  shortMessages: any[] = [];
  filteredShortMessages: any[] = [];
  searchText = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.getShortMessages();
  }

  getShortMessages(): void {

    this.http
      .get<any[]>('http://localhost:5000/api/short-messages')
      .subscribe({
        next: (data) => {
          this.shortMessages = data || [];
          this.filteredShortMessages = this.shortMessages;
        },
        error: (error) => {
          console.error('Error fetching short messages:', error);
        }
      });

  }

  searchShortMessages(): void {

    const query =
      this.searchText.trim().toLowerCase();

    if (!query) {
      this.filteredShortMessages = this.shortMessages;
      return;
    }

    this.filteredShortMessages =
      this.shortMessages.filter(item => {

        const text = [
          item.title,
          item.content,
          item.category
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return text.includes(query);
      });

  }

  openShortMessage(item: any): void {

    this.router.navigate(['/content-detail'], {
      queryParams: {
        type: 'short-messages',
        id: item._id,
        from: '/short-messages'
      }
    });

  }

  toggleFavorite(item: any, event: Event): void {

    event.stopPropagation();

    this.favoriteService.toggleFavorite(
      item,
      'short-messages'
    );

  }

  isFavorite(item: any): boolean {

    return this.favoriteService.isFavorite(
      item._id,
      'short-messages'
    );

  }
}