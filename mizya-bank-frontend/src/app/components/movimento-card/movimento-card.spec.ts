import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoCard } from './movimento-card';

describe('MovimentoCard', () => {
  let component: MovimentoCard;
  let fixture: ComponentFixture<MovimentoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimentoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
