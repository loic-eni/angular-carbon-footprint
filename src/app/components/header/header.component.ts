import { Component, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  username: WritableSignal<string>;

  constructor(userService: UserService) {
    this.username = userService.getUsername();
  }
}
