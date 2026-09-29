import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private storagePrefix = 'jcpm_favorites_';

  constructor(private authService: AuthService) {}

  // Get a unique storage key for the currently logged-in user
  private getStorageKey(): string {

    const user = this.authService.getUser();

    if (!user) {
      return `${this.storagePrefix}guest`;
    }

    const email =
      user.email ||
      user.name ||
      'user';

    return `${this.storagePrefix}${email.toLowerCase().trim()}`;
  }

  private getFavorites(): any[] {

    const data = localStorage.getItem(
      this.getStorageKey()
    );

    if (!data) {
      return [];
    }

    try {
      const parsed = JSON.parse(data);

      return Array.isArray(parsed)
        ? parsed
        : [];

    } catch {
      return [];
    }
  }

  private saveFavorites(items: any[]): void {

    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify(items)
    );
  }

  isFavorite(
    id: string,
    type: string
  ): boolean {

    return this.getFavorites().some(
      item =>
        String(item.id) === String(id) &&
        item.type === type
    );
  }

  toggleFavorite(
    item: any,
    type: string
  ): boolean {

    const id = item?._id || item?.id;

    if (!id) {
      return false;
    }

    const favorites = this.getFavorites();

    const index = favorites.findIndex(
      saved =>
        String(saved.id) === String(id) &&
        saved.type === type
    );

    // REMOVE FAVORITE
    if (index >= 0) {

      favorites.splice(index, 1);

      this.saveFavorites(favorites);

      return false;
    }

    // ADD FAVORITE
    favorites.push({

      id: id,

      type: type,

      title:
        item.titleEnglish ||
        item.title ||
        item.name ||
        'JCPM Content',

      subtitle:
        item.titleTelugu ||
        item.category ||
        '',

      content:
        item.lyricsEnglish ||
        item.lyricsTelugu ||
        item.content ||
        '',

      youtubeLink:
        item.youtubeLink ||
        '',

      savedAt: new Date().toISOString()

    });

    this.saveFavorites(favorites);

    return true;
  }

  getAll(): any[] {

    return this.getFavorites();
  }

  remove(
    id: string,
    type: string
  ): void {

    const favorites =
      this.getFavorites().filter(
        item =>
          !(
            String(item.id) === String(id) &&
            item.type === type
          )
      );

    this.saveFavorites(favorites);
  }
}