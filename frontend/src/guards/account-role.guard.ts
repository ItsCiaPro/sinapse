import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountMode, AccountRole } from '../app/services/account-mode';

// This selects a demo interface, not an authorization boundary for clinical data.
export const accountRoleGuard = (expected: AccountRole): CanActivateFn => () => {
  const accountMode = inject(AccountMode);
  const router = inject(Router);
  return accountMode.activeRole === expected
    ? true
    : router.createUrlTree([expected === 'clinic' ? '/home' : '/clinica']);
};
