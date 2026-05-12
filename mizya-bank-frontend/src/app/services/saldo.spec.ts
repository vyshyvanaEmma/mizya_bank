import { TestBed } from '@angular/core/testing';

import { SaldoService } from './saldo';

describe('Saldo', () => {
  let service: SaldoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaldoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
