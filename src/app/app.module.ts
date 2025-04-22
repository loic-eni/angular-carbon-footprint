import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarbonFootprintComputeService } from '../core/services/carbon-footprint-compute/carbon-footprint-compute.service';
import { AppComponent } from './app.component';
import { CarbonFootprintComponent } from './carbon-footprint/carbon-footprint.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CarbonFootprintFormComponent } from './carbon-footprint-form/carbon-footprint-form.component';
import { CarbonFootprintResultComponent } from './carbon-footprint-result/carbon-footprint-result.component';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent, CarbonFootprintComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CarbonFootprintFormComponent,
    CarbonFootprintResultComponent,
  ],
  providers: [CarbonFootprintComputeService],
})
export class AppModule {}
