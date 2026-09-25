import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Supabase } from "../app/services/supabase";

export const authGuard: CanActivateFn = async () => {
  const supabaseService = inject(Supabase);
  const router = inject(Router);

  const user = await supabaseService.getCurrentUser();
  return user ? true : router.createUrlTree(['/login']);
};
