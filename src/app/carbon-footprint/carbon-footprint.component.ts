import { Component, input, signal } from '@angular/core';
import { CarbonFootprintFormComponent } from '../carbon-footprint-form/carbon-footprint-form.component';
import { CarbonFootprintResultComponent } from '../carbon-footprint-result/carbon-footprint-result.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintFormComponent, CarbonFootprintResultComponent, CommonModule],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.scss'
})
export class CarbonFootprintComponent {
  distanceKm = 0;
  consommationPour100Km  = 0
  add100Km = ()=> this.distanceKm += 100;
  voyages = [
    { distanceKm: 50, consommationPour100Km: 5 },
    { distanceKm: 150, consommationPour100Km: 6 },
    { distanceKm: 250, consommationPour100Km: 7 },
    { distanceKm: 350, consommationPour100Km: 8 },
    { distanceKm: 450, consommationPour100Km: 9 }
];
  genererVoyage(){
    const distanceKm = Math.floor(Math.random() * 750)
    const consommationPour100Km = Math.floor(Math.random() * 20)
    this.voyages.push({distanceKm, consommationPour100Km})

    this.updateConsomationsEtDistances();
  }

  updateConsomationsEtDistances(){
    this.distanceKm = this.voyages.reduce((acc, v)=> acc + v.distanceKm, 0);
    this.consommationPour100Km = this.voyages.reduce((acc, v)=> acc + v.consommationPour100Km * v.distanceKm, 0)/(this.distanceKm);
  }


  ngOnInit(){
    this.updateConsomationsEtDistances();
  }
}
