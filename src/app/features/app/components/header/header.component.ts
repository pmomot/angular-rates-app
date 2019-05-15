import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss'],
  template: `
    <header>
      <img
        src="./assets/images/logo.png"
        alt="App logo"
        routerLink="/"
      >
      My rates app
    </header>
  `
})
export class HeaderComponent {}
