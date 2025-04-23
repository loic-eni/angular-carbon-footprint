import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarbonFootprintComputeService } from '../../../../core/services/carbon-footprint-compute/carbon-footprint-compute.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carbon-footprint-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './carbon-footprint-form.component.html',
  styleUrl: './carbon-footprint-form.component.scss',
})
export class CarbonFootprintFormComponent {
  computeService: CarbonFootprintComputeService;

  constructor(computeService: CarbonFootprintComputeService) {
    this.computeService = computeService;
  }

  form = new FormGroup({
    distanceKm: new FormControl(0, Validators.min(0)),
    consommationPour100Km: new FormControl(0, Validators.min(0)),
    date: new FormControl(new Date()),
  });
  submited = false;

  submitForm() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    this.computeService.addVoyage({
      distanceKm: this.form.value.distanceKm || 0,
      consommationPour100Km: this.form.value.consommationPour100Km || 0,
    });
  }
}
