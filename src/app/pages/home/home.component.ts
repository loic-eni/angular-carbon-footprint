import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../core/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  userService: UserService;

  constructor(userService: UserService, private router: Router) {
    this.userService = userService;
  }

  handleButtonClick() {
    this.userService.login('Jean');
    this.router.navigate(['/carbon-footprint']);
  }
}
