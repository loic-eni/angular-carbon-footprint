import { Component, WritableSignal } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  username: WritableSignal<string>;

  constructor(userService: UserService) {
    this.username = userService.getUsername();
  }
}
