import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Supabase } from "../app/services/supabase";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = () => {
  const supabaseService = inject(Supabase);
  const router = inject(Router);

  return supabaseService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    })
  );
};