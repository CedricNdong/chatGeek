import { TestBed } from '@angular/core/testing';

import { OpenAiServiceService } from './open-ai-service.service';

describe('OpenAiServiceService', () => {
  let service: OpenAiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
