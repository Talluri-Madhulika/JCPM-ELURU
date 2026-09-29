import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  private apiUrl = 'http://localhost:5000/api/push';

  
  private vapidPublicKey = 'BHnL3uvmROECS7xTO-ws0mxau4KIVpC-JYCeU7eqaSHBBNNH7jJgHFtldX1Q_n0FnYAomrY0Zh8vZJqLTOkbbM0';

  constructor(private http: HttpClient) {}

  async requestPermissionAndSubscribe(): Promise<void> {

    // Browser notification support check
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
      return;
    }

    // Service Worker support check
    if (!('serviceWorker' in navigator)) {
      alert('This browser does not support Service Worker.');
      return;
    }

    try {

      // Ask notification permission
      const permission =
        await Notification.requestPermission();

      if (permission !== 'granted') {
        alert('Notification permission was not granted.');
        return;
      }

      console.log('Notification permission granted.');

      // Wait for Service Worker
      const registration =
        await navigator.serviceWorker.ready;

      // Check existing subscription
      let subscription =
        await registration.pushManager.getSubscription();

      // Create subscription if it doesn't exist
      if (!subscription) {

        subscription =
          await registration.pushManager.subscribe({
            userVisibleOnly: true,

            applicationServerKey:
  this.urlBase64ToUint8Array(
    this.vapidPublicKey
  ) as BufferSource
          });
      }

      console.log(
        'Push subscription:',
        subscription
      );

      // Save subscription in backend
      this.http
        .post(
          `${this.apiUrl}/subscribe`,
          subscription
        )
        .subscribe({
          next: (response) => {

            console.log(
              'Push subscription saved successfully.',
              response
            );

            alert(
              'Notifications enabled successfully!'
            );
          },

          error: (error) => {

            console.error(
              'Error saving push subscription:',
              error
            );

            alert(
              'Notification subscription could not be saved.'
            );
          }
        });

    } catch (error) {

      console.error(
        'Push notification error:',
        error
      );

      alert(
        'Could not enable notifications.'
      );
    }
  }

  // Convert VAPID public key
  private urlBase64ToUint8Array(
    base64String: string
  ): Uint8Array {

    const padding =
      '='.repeat(
        (4 - (base64String.length % 4)) % 4
      );

    const base64 =
      (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData =
      window.atob(base64);

    const outputArray =
      new Uint8Array(
        rawData.length
      );

    for (
      let i = 0;
      i < rawData.length;
      ++i
    ) {
      outputArray[i] =
        rawData.charCodeAt(i);
    }

    return outputArray;
  }
}