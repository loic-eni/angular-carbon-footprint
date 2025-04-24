import { Component, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Voyage } from '../../core/services/carbon-footprint-compute/carbon-footprint-compute.types';
import { CarbonFootprintComputeService } from '../../core/services/carbon-footprint-compute/carbon-footprint-compute.service';
import { CarbonFootprintFormComponent } from './components/carbon-footprint-form/carbon-footprint-form.component';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-carbon-footprint',
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    CarbonFootprintFormComponent,
    MatChipsModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [CarbonFootprintComputeService],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.scss',
})
export class CarbonFootprintComponent {
  voyagesLoading = true;
  resumeLoading = true;

  voyages: Signal<Voyage[]> = signal([]);
  skeletonVoyages = [{}, {}, {}, {}, {}] as Voyage[];
  distanceKm: Signal<number> = signal(0);
  consommationPour100Km: Signal<number> = signal(0);
  emissionsCO2: Signal<number> = signal(0);
  displayedColumns = ['vehicule', 'distance', 'consommation', 'emissions'];

  constructor(carbonFootprintComputeService: CarbonFootprintComputeService) {
    (async () => {
      this.voyages = await carbonFootprintComputeService.getVoyages();
      this.voyagesLoading = false;
    })();
    (async () => {
      const { distanceKm, consommationPour100Km, quantiteCO2Totale } =
        await carbonFootprintComputeService.getResumeVoyages();
      this.distanceKm = distanceKm;
      this.consommationPour100Km = consommationPour100Km;
      this.emissionsCO2 = quantiteCO2Totale;
      this.resumeLoading = false;
    })();
  }
}
