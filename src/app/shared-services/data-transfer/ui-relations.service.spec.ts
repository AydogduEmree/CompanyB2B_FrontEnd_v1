import { TestBed } from '@angular/core/testing';

import { UiRelationsService } from './ui-relations.service';

describe('UiRelationsService', () => {
  let service: UiRelationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiRelationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
