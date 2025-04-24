import { TestBed } from '@angular/core/testing';

import { AsyncMockService } from './async-mock.service';

describe('AsyncMockService', () => {
  let service: AsyncMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
