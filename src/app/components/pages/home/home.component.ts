import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../core/services/user/user.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  userService: UserService;
  form: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  submited = false;
  loading = false;

  constructor(userService: UserService, private router: Router) {
    this.userService = userService;
  }

  async submitForm() {
    this.submited = true;
    if (this.form.invalid) return;
    this.loading = true;
    await this.userService.login(this.form.value.username);
    this.loading = false;
    this.router.navigate(['/carbon-footprint']);
  }
}
