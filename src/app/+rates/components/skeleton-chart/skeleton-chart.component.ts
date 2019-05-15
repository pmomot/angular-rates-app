import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-skeleton-chart',
  template: `
    <div class="skeleton-block skeleton-block--normal sc-value-change"></div>
    <div class="skeleton-block sc-chart"></div>
  `,
  styleUrls: ['./skeleton-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonChartComponent {}
