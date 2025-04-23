import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username = signal('');

  login(username: string) {
    this.username.set(username);
  }

  getUsername() {
    return this.username;
  }
}
