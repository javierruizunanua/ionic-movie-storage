import { TestBed } from '@angular/core/testing';

import { GamecrudService } from './gamecrud.service';

describe('GamecrudService', () => {
  let service: GamecrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamecrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
