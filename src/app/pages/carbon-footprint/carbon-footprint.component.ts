import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Voyage } from '../../core/services/carbon-footprint-compute/carbon-footprint-compute.types';
import { CarbonFootprintComputeService } from '../../core/services/carbon-footprint-compute/carbon-footprint-compute.service';
import { CarbonFootprintFormComponent } from './components/carbon-footprint-form/carbon-footprint-form.component';

@Component({
  selector: 'app-carbon-footprint',
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    CarbonFootprintFormComponent,
  ],
  providers: [CarbonFootprintComputeService],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.scss',
})
export class CarbonFootprintComponent {
  voyages: Signal<Voyage[]>;
  distanceKm: Signal<number>;
  consommationPour100Km: Signal<number>;
  emissionsCO2: Signal<number>;
  generateVoyage: () => void;
  displayedColumns = ['distance', 'consommation', 'emissions'];

  constructor(carbonFootprintComputeService: CarbonFootprintComputeService) {
    this.voyages = carbonFootprintComputeService.getVoyages();
    const { distanceKm, consommationPour100Km, quantiteCO2Totale } =
      carbonFootprintComputeService.getResumeVoyages();

    this.distanceKm = distanceKm;
    this.consommationPour100Km = consommationPour100Km;
    this.emissionsCO2 = quantiteCO2Totale;

    this.generateVoyage = () => {
      const distanceKm = Math.floor(Math.random() * 1000);
      const consommationPour100Km = Math.floor(Math.random() * 20);
      carbonFootprintComputeService.addVoyage({
        distanceKm,
        consommationPour100Km,
      });
    };
  }
}
