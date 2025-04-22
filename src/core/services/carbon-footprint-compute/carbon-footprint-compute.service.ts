import { computed, Injectable, signal } from '@angular/core';
import { Voyage } from './carbon-footprint-compute.types';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintComputeService {
  private voyages = signal([
    { distanceKm: 50, consommationPour100Km: 5, quantiteCO2: 5.75 },
    { distanceKm: 150, consommationPour100Km: 6, quantiteCO2: 20.7 },
    { distanceKm: 250, consommationPour100Km: 7, quantiteCO2: 40.25 },
    { distanceKm: 350, consommationPour100Km: 8, quantiteCO2: 64.4 },
    { distanceKm: 450, consommationPour100Km: 9, quantiteCO2: 93.15 },
  ]);
  private distanceKm = computed(() =>
    this.voyages().reduce((acc, v) => acc + v.distanceKm, 0)
  );
  private consommationPour100Km = computed(
    () =>
      this.voyages().reduce(
        (acc, v) => acc + v.consommationPour100Km * v.distanceKm,
        0
      ) / this.distanceKm()
  );
  private quantiteCO2Totale = computed(() =>
    this.computeCO2Emissions(this.distanceKm(), this.consommationPour100Km())
  );

  private computeCO2Emissions = (
    distanceKm: number,
    consommationPour100Km: number
  ) => ((distanceKm * consommationPour100Km) / 100) * 2.3;

  addVoyage(voyage: Omit<Voyage, 'quantiteCO2'>) {
    const quantiteCO2 = this.computeCO2Emissions(
      voyage.distanceKm,
      voyage.consommationPour100Km
    );

    const _voyage: Voyage = { ...voyage, quantiteCO2 };
    this.voyages.update((voyages) => [...voyages, _voyage]);
  }

  getVoyages() {
    return computed(() => this.voyages());
  }

  getResumeVoyages() {
    return {
      distanceKm: this.distanceKm,
      consommationPour100Km: this.consommationPour100Km,
      quantiteCO2Totale: this.quantiteCO2Totale,
    };
  }
}
