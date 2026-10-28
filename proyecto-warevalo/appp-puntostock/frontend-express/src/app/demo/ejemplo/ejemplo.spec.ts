import { TestBed } from '@angular/core/testing';
import { Ejemplo } from './ejemplo';

describe('Ejemplo', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejemplo],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Ejemplo);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load the initial product', () => {
    const fixture = TestBed.createComponent(Ejemplo);

    expect(
      fixture.componentInstance.producto().nombre
    ).toBe('Café molido 500 g');
  });

  it('should calculate IVA', () => {
    const fixture = TestBed.createComponent(Ejemplo);

    expect(
      fixture.componentInstance.iva()
    ).toBe(21420);
  });

  it('should start with the product active', () => {
    const fixture = TestBed.createComponent(Ejemplo);

    expect(
      fixture.componentInstance.producto().activo
    ).toBe(true);
  });

});
