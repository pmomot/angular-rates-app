import { Injectable } from '@angular/core';
import { RatesDataService } from '../../api/rates/rates-data.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface ChartData {
  pair: string;
  labels: string[];
  data: number[];
  valueChange: number;
}

@Injectable({
  providedIn: 'root'
})
export class RatesTimeSeriesService {
  constructor (private ratesDataService: RatesDataService) {}

  private calculatePercentageDifference (start: number, end: number) {
    return +(100 * (end / start - 1)).toFixed(2);
  }

  private processDate (date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${day}-${month}`;
  }

  getRatesTimeSeries (base: string, quote: string, start?: Date, end?: Date): Observable<ChartData> {
    return this.ratesDataService.getRatesTimeSeries(start, end, base, quote).pipe(
      map(rates => {
        const labels = rates.map(r => this.processDate(r.date));
        const data = rates.map(r => r.value);
        const valueChange = this.calculatePercentageDifference(data[0], data[data.length - 1]);
        return {labels, data, valueChange, pair: `${base}/${quote}`};
      })
    );
  }
}
