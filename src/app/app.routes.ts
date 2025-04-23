import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CarbonFootprintComponent } from './pages/carbon-footprint/carbon-footprint.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'carbon-footprint', component: CarbonFootprintComponent },
  { path: '', pathMatch: 'full', redirectTo: '/carbon-footprint' },
];
