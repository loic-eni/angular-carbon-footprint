import { Component, Signal } from '@angular/core';
import { CarbonFootprintFormComponent } from '../carbon-footprint-form/carbon-footprint-form.component';
import { CarbonFootprintResultComponent } from '../carbon-footprint-result/carbon-footprint-result.component';
import { CommonModule } from '@angular/common';
import { CarbonFootprintComputeService } from '../../core/services/carbon-footprint-compute/carbon-footprint-compute.service';
import { Voyage } from '../../core/services/carbon-footprint-compute/carbon-footprint-compute.types';

@Component({
  selector: 'app-carbon-footprint',
  imports: [
    CarbonFootprintFormComponent,
    CarbonFootprintResultComponent,
    CommonModule,
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
