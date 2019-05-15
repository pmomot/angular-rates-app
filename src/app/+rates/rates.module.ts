import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RatesComponentsModule } from './components/rates-components.module';
import { RatesRoutingModule } from './rates-routing.module';
import { RatesStateComponent } from './rates-state.component';

@NgModule({
  imports: [
    SharedModule,
    RatesRoutingModule,
    RatesComponentsModule
  ],
  declarations: [
    RatesStateComponent
  ],
  exports: [
    RatesStateComponent
  ]
})
export class RatesModule {}
