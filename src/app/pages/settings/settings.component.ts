import { Component } from '@angular/core';
import { PushNotificationService } from '../../services/push-notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  notificationsEnabled = false;
  loading = false;

  constructor(
    private pushNotificationService: PushNotificationService
  ) {}

  async enableNotifications(): Promise<void> {

    this.loading = true;

    try {
      await this.pushNotificationService
        .requestPermissionAndSubscribe();

      this.notificationsEnabled = true;

    } catch (error) {
      console.error(
        'Notification error:',
        error
      );
    } finally {
      this.loading = false;
    }
  }
}