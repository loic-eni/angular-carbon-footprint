import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../core/services/user/user.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatInputModule, ReactiveFormsModule],
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

  constructor(userService: UserService, private router: Router) {
    this.userService = userService;
  }

  submitForm() {
    this.submited = true;
    if (this.form.invalid) return;
    this.userService.login(this.form.value.username);
    this.router.navigate(['/carbon-footprint']);
  }
}
