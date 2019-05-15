import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponentsModule } from './components/app-components.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    RouterModule,
    AppComponentsModule
  ],
  declarations: [
    AppComponent
  ],
  exports: [
    AppComponent
  ]
})
export class AppFeatureModule {}
