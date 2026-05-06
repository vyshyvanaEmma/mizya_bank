import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertVal } from './convert-val';

describe('ConvertVal', () => {
  let component: ConvertVal;
  let fixture: ComponentFixture<ConvertVal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertVal],
    }).compileComponents();

    fixture = TestBed.createComponent(ConvertVal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
