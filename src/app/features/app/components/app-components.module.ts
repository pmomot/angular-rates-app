import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';

const components = [
  HeaderComponent
];

@NgModule({
  declarations: components,
  exports: components
})
export class AppComponentsModule {}
