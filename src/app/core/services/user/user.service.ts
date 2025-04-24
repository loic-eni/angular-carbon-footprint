import { computed, Injectable, signal } from '@angular/core';

const LOGIN_DELAY_MS = 1500;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username = signal('');
  isLoggedin = computed(() => !!this.username());

  login(username: string) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.username.set(username);
        resolve();
      }, LOGIN_DELAY_MS);
    });
  }

  getUsername() {
    return this.username;
  }
}
