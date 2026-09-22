import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Supabase } from "../app/services/supabase";

export const guestGuard: CanActivateFn = async () => {
  const supabaseService = inject(Supabase);
  const router = inject(Router);

  const user = await supabaseService.getCurrentUser();
  console.log(user);

  if (user) {
   router.navigate(['/home']);
   return false;
  }

  return true;
};