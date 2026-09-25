import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Supabase } from '../supabase';
import { Router } from '@angular/router';
import { AccountMode, AccountRole } from '../account-mode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  supabaseService = inject(Supabase);
  accountMode = inject(AccountMode);

  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private router: Router) { }

  async register(email: string, password: string, role: AccountRole = 'patient', clinicName = '') {

    this.errorMessage = '';
    this.successMessage = '';

    this.loading = true;
    try {
      await this.supabaseService.signUp(email, password);
      this.accountMode.rememberRegistration(email, { role, clinicName: role === 'clinic' ? clinicName.trim() : undefined });
      this.accountMode.setActive(role);
      this.successMessage = 'Registro realizado!';
      this.router.navigate(['/login']);

    } catch (err: any) {
      this.errorMessage = err.message ?? 'Erro ao registrar.';

    } finally {
      return {
        successMessage: this.successMessage || null,
        errorMessage: this.errorMessage || null
      }
    }
  }

  async logIn(email: string, password: string, role: AccountRole = 'patient') {
    this.errorMessage = '';
    this.successMessage = '';

    this.loading = true;
    try {
      await this.supabaseService.signIn(email, password);
      this.accountMode.setActive(role);
      this.successMessage = 'Login realizado!';
      this.router.navigate([role === 'clinic' ? '/clinica' : '/home']);

    } catch (err: any) {
      this.errorMessage = err ?? 'Erro ao fazer login';

    } finally {
      return {
        successMessage: this.successMessage || null,
        errorMessage: this.errorMessage || null
      }
    }
  }

  async logOut() {
    try {
      await this.supabaseService.signOut();
      this.accountMode.clearActive();
      this.successMessage = 'Logout realizado!';
      this.router.navigate(['/login']);
    }

    catch (err: any) {
      this.errorMessage = err ?? 'Erro ao fazer logout';
    } 
    
    finally {
      return {
        successMessage: this.successMessage || null,
        errorMessage: this.errorMessage || null
      }
    }
  }
}
