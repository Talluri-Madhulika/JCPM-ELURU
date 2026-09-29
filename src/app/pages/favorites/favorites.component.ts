import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: any[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favorites = this.favoriteService.getAll();
  }

  openFavorite(item: any): void {
    this.router.navigate(['/content-detail'], {
      queryParams: {
        type: item.type,
        id: item.id
      }
    });
  }

  removeFavorite(
    item: any,
    event: Event
  ): void {

    event.stopPropagation();

    this.favoriteService.remove(
      item.id,
      item.type
    );

    this.loadFavorites();
  }

  getTypeName(type: string): string {

    const names: any = {
      songs: 'Song',
      messages: 'Message',
      'short-messages': 'Short Message',
      'action-songs': 'Action Song'
    };

    return names[type] || 'JCPM';
  }
}