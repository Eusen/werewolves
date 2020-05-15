import { TestBed } from '@angular/core/testing';

import { TsKoaService } from './ts-koa.service';

describe('TsKoaService', () => {
  let service: TsKoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TsKoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
