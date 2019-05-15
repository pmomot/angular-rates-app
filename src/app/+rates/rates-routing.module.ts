import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatesStateComponent } from './rates-state.component';
import { SymbolsResolver } from './resolvers/symbols.resolver';

const routes: Routes = [
  {
    path: '',
    component: RatesStateComponent,
    resolve: [
      SymbolsResolver
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SymbolsResolver]
})
export class RatesRoutingModule {}
