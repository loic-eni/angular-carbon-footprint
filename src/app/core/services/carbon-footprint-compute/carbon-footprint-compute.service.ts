import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Voyage } from './carbon-footprint-compute.types';
import { AsyncMockService } from '../async-mock/async-mock.service';

const POST_DELAY_MS = 1000;
const FETCH_DELAY_MS = 5000;

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintComputeService {
  asyncMock = inject(AsyncMockService).asyncMock;
  private voyages: WritableSignal<Voyage[]> = signal([
    {
      distanceKm: 50,
      consommationPour100Km: 5,
      quantiteCO2: 5.75,
      vehicule: 'voiture',
    },
    {
      distanceKm: 150,
      consommationPour100Km: 6,
      quantiteCO2: 20.7,
      vehicule: 'voiture',
    },
    {
      distanceKm: 250,
      consommationPour100Km: 7,
      quantiteCO2: 40.25,
      vehicule: 'voiture',
    },
    {
      distanceKm: 350,
      consommationPour100Km: 8,
      quantiteCO2: 64.4,
      vehicule: 'voiture',
    },
    {
      distanceKm: 450,
      consommationPour100Km: 9,
      quantiteCO2: 93.15,
      vehicule: 'voiture',
    },
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
    this.voyages().reduce((acc, voyage) => acc + voyage.quantiteCO2, 0)
  );

  private computeVoyageCO2Emissions = (voyage: Omit<Voyage, 'quantiteCO2'>) => {
    const { distanceKm, consommationPour100Km, vehicule } = voyage;
    switch (vehicule) {
      case 'voiture':
        return ((distanceKm * consommationPour100Km) / 100) * 2.3;
      case 'train':
        return distanceKm * 0.03;
      case 'avion':
        return distanceKm * 0.2;
    }
  };

  addVoyage(voyage: Omit<Voyage, 'quantiteCO2'>) {
    const quantiteCO2 = this.computeVoyageCO2Emissions(voyage);

    if (voyage.vehicule !== 'voiture') voyage.consommationPour100Km = 0;

    const _voyage: Voyage = { ...voyage, quantiteCO2 };

    return this.asyncMock(() => {
      this.voyages.update((voyages) => [...voyages, _voyage]);
    }, POST_DELAY_MS);
  }

  getVoyages() {
    return this.asyncMock(() => this.voyages, FETCH_DELAY_MS);
  }

  getResumeVoyages() {
    return this.asyncMock(
      () => ({
        distanceKm: this.distanceKm,
        consommationPour100Km: this.consommationPour100Km,
        quantiteCO2Totale: this.quantiteCO2Totale,
      }),
      FETCH_DELAY_MS
    );
  }
}
