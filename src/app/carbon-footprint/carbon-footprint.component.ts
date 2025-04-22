import { Component } from '@angular/core';
import { CarbonFootprintFormComponent } from '../carbon-footprint-form/carbon-footprint-form.component';
import { CarbonFootprintResultComponent } from '../carbon-footprint-result/carbon-footprint-result.component';

@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintFormComponent, CarbonFootprintResultComponent],
  templateUrl: './carbon-footprint.component.html',
  styleUrl: './carbon-footprint.component.scss'
})
export class CarbonFootprintComponent {
  ngOnChanges(){
    console.log('carbon footprint Changes')
  }
  ngOnInit(){
    console.log('carbon footprint Init')
  }
  ngDoCheck(){
    console.log('carbon footprint DoCheck')
  }
  ngAfterContentInit(){
    console.log('carbon footprint AfterContentInit')
  }
  ngAfterContentChecked(){
    console.log('carbon footprint AfterContentChecked')
  }
  ngAfterViewInit(){
    console.log('carbon footprint AfterViewInit')
  }
  ngAfterViewChecked(){
    console.log('carbon footprint AfterViewChecked')
  }
  ngOnDestroy(){
    console.log('carbon footprint OnDestroy')
  }
}
