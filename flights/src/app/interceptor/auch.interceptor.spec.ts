import { TestBed } from '@angular/core/testing';

import { AuchInterceptor } from './auch.interceptor';

describe('AuchInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuchInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuchInterceptor = TestBed.inject(AuchInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
