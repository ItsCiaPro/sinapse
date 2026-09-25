import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Supabase } from "../app/services/supabase";
import { AccountMode } from "../app/services/account-mode";

export const guestGuard: CanActivateFn = async () => {
  const supabaseService = inject(Supabase);
  const router = inject(Router);
  const accountMode = inject(AccountMode);

  const user = await supabaseService.getCurrentUser();

  if (user) {
   return router.createUrlTree([accountMode.activeRole === 'clinic' ? '/clinica' : '/home']);
  }

  return true;
};
