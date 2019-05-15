import { ModuleWithProviders, NgModule } from '@angular/core';

import { RatesDataService } from './rates/rates-data.service';

@NgModule({})
export class ApiModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        RatesDataService
      ]
    };
  }
}
