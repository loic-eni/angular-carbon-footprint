import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CarbonFootprintComponent } from './pages/carbon-footprint/carbon-footprint.component';
import { loginGuard } from './login.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [loginGuard] },
  {
    path: 'carbon-footprint',
    component: CarbonFootprintComponent,
    canActivate: [loginGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: '/carbon-footprint' },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];
