import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it, beforeEach } from 'vitest';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });

  it('should not render the layout directly in App', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-header')).toBeNull();
    expect(element.querySelector('app-aside')).toBeNull();
    expect(element.querySelector('app-footer')).toBeNull();
  });

  it('should not render the example component', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('app-ejemplo'),
    ).toBeNull();
  });
});
