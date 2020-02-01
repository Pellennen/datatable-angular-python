import { TestBed } from '@angular/core/testing';

import { LettersApiService } from './letters-api.service';

describe('LettersApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LettersApiService = TestBed.get(LettersApiService);
    expect(service).toBeTruthy();
  });
});
