import { TestBed } from '@angular/core/testing';

import { SBookPriceService } from './s-book-price.service';

describe('SBookPriceService', () => {
  let service: SBookPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SBookPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
