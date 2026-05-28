import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { moderateurGuard } from './moderateur.guard';

describe('moderateurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => moderateurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
