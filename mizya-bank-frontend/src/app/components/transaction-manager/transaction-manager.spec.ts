import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionManager } from './transaction-manager';

describe('TransactionManager', () => {
  let component: TransactionManager;
  let fixture: ComponentFixture<TransactionManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
