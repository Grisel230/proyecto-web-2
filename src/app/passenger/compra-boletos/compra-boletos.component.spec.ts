import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraBoletosComponent } from './compra-boletos.component';

describe('CompraBoletosComponent', () => {
  let component: CompraBoletosComponent;
  let fixture: ComponentFixture<CompraBoletosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraBoletosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
