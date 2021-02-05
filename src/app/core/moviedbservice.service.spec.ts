import { TestBed } from '@angular/core/testing';

import { MoviedbserviceService } from './moviedb.service';

describe('MoviedbserviceService', () => {
  let service: MoviedbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviedbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
