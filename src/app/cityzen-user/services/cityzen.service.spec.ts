import { TestBed } from '@angular/core/testing';

import { CityzenService } from './cityzen.service';

describe('CityzenService', () => {
  let service: CityzenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityzenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
