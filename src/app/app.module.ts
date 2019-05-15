import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './features/app/app.component';
import { FeaturesModule } from './features/features.module';
import { ApiModule } from './api/api.module';
import { RatesInterceptor } from './api/rates/rates.interceptor';
import { reducers } from './state';
import { RatesEffects } from './state/rates/rates.effects';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      RatesEffects
    ]),

    AppRoutingModule,
    FeaturesModule,
    ApiModule.forRoot(),
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RatesInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
