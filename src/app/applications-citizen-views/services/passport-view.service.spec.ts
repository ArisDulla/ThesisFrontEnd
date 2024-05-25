import { TestBed } from '@angular/core/testing';

import { PassportViewService } from './passport-view.service';

describe('PassportViewService', () => {
  let service: PassportViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassportViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
