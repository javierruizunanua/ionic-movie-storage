import { TestBed } from '@angular/core/testing';

import { GamedbService } from './gamedb.service';

describe('GamedbService', () => {
  let service: GamedbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamedbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
