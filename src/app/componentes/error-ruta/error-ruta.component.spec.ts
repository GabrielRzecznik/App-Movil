import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRutaComponent } from './error-ruta.component';

describe('ErrorRutaComponent', () => {
  let component: ErrorRutaComponent;
  let fixture: ComponentFixture<ErrorRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorRutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
