import { TestBed } from '@angular/core/testing';

import { ProductsservicesService } from './productsservices.service';

describe('ProductsservicesService', () => {
  let service: ProductsservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
