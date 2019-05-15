import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  const queries = {
    logo: By.css('img'),
    title: By.css('header')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HeaderComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should have logo', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    expect(fixture.debugElement.query(queries.logo).nativeElement.src.split('assets')[1]).toBe('/images/logo.png');
  });

  it('should have correct title', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    expect(fixture.debugElement.query(queries.title).nativeElement.textContent.trim()).toBe('My rates app');
  });
});
