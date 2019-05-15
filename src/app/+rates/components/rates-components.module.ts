import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ConversionFormComponent } from './conversion-form/conversion-form.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { SkeletonChartComponent } from './skeleton-chart/skeleton-chart.component';
import { SkeletonFormComponent } from './skeleton-form/skeleton-form.component';
import { ValueChangeComponent } from './value-change/value-change.component';

const components = [
  ConversionFormComponent,
  LineChartComponent,
  SkeletonChartComponent,
  SkeletonFormComponent,
  ValueChangeComponent
];

@NgModule({
  imports: [SharedModule],
  declarations: components,
  exports: components
})
export class RatesComponentsModule {}
