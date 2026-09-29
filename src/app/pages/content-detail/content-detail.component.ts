import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {

  item: any = null;

  type = '';

  from = '/';

  loading = true;

  videoId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {

    this.type =
      this.route.snapshot.queryParamMap.get('type') || '';

    const id =
      this.route.snapshot.queryParamMap.get('id');

    this.from =
      this.route.snapshot.queryParamMap.get('from') || '/';

    if (!id || !this.type) {
      this.loading = false;
      return;
    }

    this.loadContent(id);
  }

  loadContent(id: string): void {

    this.http
      .get<any>(
        `http://localhost:5000/api/${this.type}/${id}`
      )
      .subscribe({
        next: (data) => {

          this.item = data;

          this.videoId =
            this.getYoutubeId(
              data.youtubeLink ||
              data.youtubeUrl ||
              data.videoUrl ||
              ''
            );

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Error loading content:',
            error
          );

          this.loading = false;
        }
      });

  }

  getYoutubeId(url: string): string {

    if (!url) {
      return '';
    }

    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([^&?/]+)/
    );

    return match ? match[1] : '';
  }

  getEmbedUrl(): string {

    if (!this.videoId) {
      return '';
    }

    return `https://www.youtube.com/embed/${this.videoId}`;
  }

  getYoutubeUrl(): string {

    return (
      this.item?.youtubeLink ||
      this.item?.youtubeUrl ||
      this.item?.videoUrl ||
      ''
    );

  }

  getPageTitle(): string {

    const titles: any = {
      songs: 'Songs',
      messages: 'Messages',
      'short-messages': 'Short Messages',
      'action-songs': 'Action Songs'
    };

    return titles[this.type] || 'JCPM ELURU';
  }

  getContentTitle(): string {

    if (this.type === 'songs') {
      return 'Lyrics';
    }

    if (this.type === 'action-songs') {
      return 'Lyrics & Actions';
    }

    return 'Message';
  }

  toggleFavorite(): void {

    if (!this.item) {
      return;
    }

    this.favoriteService.toggleFavorite(
      this.item,
      this.type
    );

  }

  isFavorite(): boolean {

    if (!this.item?._id) {
      return false;
    }

    return this.favoriteService.isFavorite(
      this.item._id,
      this.type
    );

  }

  goBack(): void {
    this.router.navigateByUrl(this.from);
  }
}