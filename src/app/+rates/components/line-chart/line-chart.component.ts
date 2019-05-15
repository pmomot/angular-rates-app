import {
  AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import * as Chart from 'chart.js/dist/Chart.js';
import { ChartData } from '../../services/rates-time-series.service';

interface Tooltip {
  datasetIndex: number;
  index: number;
  x: number;
  xLabel: string;
  y: number;
  yLabel: number | string;
}

//
// Chart options
const getOptions = (chartData: ChartData) => {
  const { pair } = chartData;
  const currencySymbol = pair.split('/')[1];
  const ticks = {
    fontColor: '#7a809d',
    maxTicksLimit: 4,
    minTicksLimit: 4
  };

  return {
    animation: false,
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        // display: false,
        gridLines: {
          display: false,
          color: '#f5f6fa',
        },
        ticks: {
          autoSkipPadding: 100,
          padding: 10,
          maxRotation: 0,
          fontColor: '#7a809d',
        },
      }],
      yAxes: [{
        display: true,
        gridLines: {
          display: true,
          color: '#FFD88D',
          zeroLineWidth: 0,
          offsetGridLines: true
        },
        ticks,
      }],
    },
    elements: {
      line: {
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        tension: 0, // disables bezier curves
      }
    },
    maintainAspectRatio: false,
    spanGaps: false,
    plugins: {
      filler: {
        propagate: false
      },
      samples_filler_analyser: {
        target: 'chart-analyser'
      }
    },
    tooltips: {
      intersect: false,
      enabled: true,
      mode: 'index',
      displayColors: false,
      position: 'nearest',
      titleFontSize: 16,
      titleFontStyle: 'normal',
      xPadding: 16,
      yPadding: 16,
      callbacks: {
        title: (tooltips: Tooltip[]) => `${tooltips[0].yLabel} ${currencySymbol}`,
        label: (tooltip: Tooltip) => tooltip.xLabel
      }
    },
    hover: {
      // show dataset point on hover on any part of the chart
      // only for mobile where we hide the normal tooltip
      intersect: true
    }
  };
};

//
// Chart colors
const colors = {
  borderColor: '#ff8f00',
  borderWidth: 3,
  pointHoverRadius: 5,
  pointHoverBorderWidth: 4,
  pointHoverBorderColor: '#fff',
  pointBackgroundColor: '#ff8f00',
  pointRadius: 0,
};

@Component({
  selector: 'app-line-chart',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="chart-wrapper">
      <canvas #chart width="100%" height="100%"></canvas>
    </div>

    <div class="chart-loading" [class.visible]="chartLoading">loading</div>
  `
})
export class LineChartComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private componentDestroy$ = new Subject();
  private chartInstance: any;

  @ViewChild('chart') chart: any;
  @Input() chartData: ChartData = {
    labels: [],
    data: [],
    pair: '',
    valueChange: null
  };
  @Input() chartLoading: boolean;

  private initChart () {
    const ctx = this.chart.nativeElement.getContext('2d');
    const gradientStroke = ctx.createLinearGradient(0, 0, 0, 245);
    gradientStroke.addColorStop(0, 'rgba(222, 125, 0, 0.15)');
    gradientStroke.addColorStop(1, 'rgba(255, 255, 255, 0.25)');

    const data = {
      labels: this.chartData.labels,
      datasets: [
        {
          ...colors,
          backgroundColor: gradientStroke,
          data: this.chartData.data,
        },
      ],
    };

    this.chartInstance = new (Chart as any)(ctx, {
      type: 'line',
      data,
      options: getOptions(this.chartData)
    });
  }

  private updateChart () {
    if (!this.chartInstance) {
      return;
    }
    this.chartInstance.reset();
    this.chartInstance.options = getOptions(this.chartData);
    this.chartInstance.data.labels = this.chartData.labels;
    this.chartInstance.data.datasets[0].data = this.chartData.data;
    this.chartInstance.update({
      duration: 500,
    });
  }

  ngOnInit () {
    this.initChart();
  }

  ngOnChanges () {
    this.updateChart();
  }

  ngAfterViewInit () {
    this.updateChart();
  }

  ngOnDestroy () {
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
  }
}
