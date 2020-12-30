import { TestBed } from '@angular/core/testing';

import { DecriptionService } from './decription.service';

describe('DecriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecriptionService = TestBed.get(DecriptionService);
    expect(service).toBeTruthy();
  });
});
