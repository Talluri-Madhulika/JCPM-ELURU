import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-action-songs',
  templateUrl: './action-songs.component.html',
  styleUrls: ['./action-songs.component.css']
})
export class ActionSongsComponent implements OnInit {

  actionSongs: any[] = [];
  filteredActionSongs: any[] = [];
  searchText = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadActionSongs();
  }

  loadActionSongs(): void {
    this.http.get<any[]>('http://localhost:5000/api/action-songs')
      .subscribe({
        next: (data) => {
          this.actionSongs = data || [];
          this.filteredActionSongs = this.actionSongs;
        },
        error: (error) => {
          console.error('Error loading action songs:', error);
          this.actionSongs = [];
          this.filteredActionSongs = [];
        }
      });
  }

  searchActionSongs(): void {
    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      this.filteredActionSongs = this.actionSongs;
      return;
    }

    this.filteredActionSongs = this.actionSongs.filter(song =>
      (song.title || '').toLowerCase().includes(search) ||
      (song.content || '').toLowerCase().includes(search) ||
      (song.category || '').toLowerCase().includes(search)
    );
  }

  openActionSong(item: any): void {
    const id = item?._id || item?.id;

    if (!id) {
      return;
    }

    this.router.navigate(['/content-detail'], {
      queryParams: {
        type: 'action-songs',
        id: id,
        from: '/action-songs'
      }
    });
  }

  toggleFavorite(item: any, event: Event): void {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(item, 'action-songs');
  }

  isFavorite(item: any): boolean {
    const id = item?._id || item?.id;

    if (!id) {
      return false;
    }

    return this.favoriteService.isFavorite(id, 'action-songs');
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}