import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Supabase } from '../supabase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  supabaseService = inject(Supabase);

  errorMessage = '';
  successMessage = '';
  loading = false;

  constructor(private router: Router) { }

  async register(email: string, password: string) {

    this.errorMessage = '';
    this.successMessage = '';

    this.loading = true;
    try {
      await this.supabaseService.signUp(email, password);
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

  async logIn(email: string, password: string) {
    this.errorMessage = '';
    this.successMessage = '';

    this.loading = true;
    try {
      await this.supabaseService.signIn(email, password);
      this.successMessage = 'Login realizado!';
      this.router.navigate(['/home']);

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
