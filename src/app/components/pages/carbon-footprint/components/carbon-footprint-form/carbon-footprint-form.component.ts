import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarbonFootprintComputeService } from '../../../../../core/services/carbon-footprint-compute/carbon-footprint-compute.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Voyage } from '../../../../../core/services/carbon-footprint-compute/carbon-footprint-compute.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carbon-footprint-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './carbon-footprint-form.component.html',
  styleUrl: './carbon-footprint-form.component.scss',
})
export class CarbonFootprintFormComponent {
  computeService: CarbonFootprintComputeService;
  constructor(computeService: CarbonFootprintComputeService) {
    this.computeService = computeService;
  }
  vehicules: Voyage['vehicule'][] = ['voiture', 'train', 'avion'];

  form = new FormGroup({
    vehicule: new FormControl<Voyage['vehicule']>('voiture'),
    distanceKm: new FormControl(0, Validators.min(0)),
    consommationPour100Km: new FormControl(0, Validators.min(0)),
    date: new FormControl(new Date()),
  });
  submited = false;

  async submitForm() {
    this.submited = true;
    if (this.form.invalid) return;
    this.submited = false;

    await this.computeService.addVoyage({
      distanceKm: this.form.value.distanceKm || 0,
      consommationPour100Km: this.form.value.consommationPour100Km || 0,
      vehicule: this.form.value.vehicule || 'voiture',
    });
  }
}
