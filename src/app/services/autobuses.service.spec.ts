import { TestBed } from '@angular/core/testing';

import { AutobusesService } from './autobuses.service';

describe('AutobusesService', () => {
  let service: AutobusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutobusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
