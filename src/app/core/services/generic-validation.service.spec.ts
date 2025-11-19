import { TestBed } from '@angular/core/testing';

import { GenericValidationService } from './generic-validation.service';

describe('GenericValidationService', () => {
  let service: GenericValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
