import { TestBed } from '@angular/core/testing';

import { QuestionsListService } from './questions-list.service';

describe('QuestionsService', () => {
  let service: QuestionsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
