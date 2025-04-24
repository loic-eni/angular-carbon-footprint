export interface Voyage {
  distanceKm: number;
  consommationPour100Km: number;
  quantiteCO2: number;
  vehicule: 'voiture' | 'train' | 'avion';
}
