import { TestBed } from '@angular/core/testing';

import { ServercomunicationService } from './servercomunication.service';

describe('ServercomunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServercomunicationService = TestBed.get(ServercomunicationService);
    expect(service).toBeTruthy();
  });
});
