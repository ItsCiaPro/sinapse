import { Injectable } from '@angular/core';

export type AccountRole = 'patient' | 'clinic';
type Registration = { role: AccountRole; clinicName?: string };

@Injectable({ providedIn: 'root' })
export class AccountMode {
  private readonly roleKey = 'sinapse.accountRole';
  private readonly registrationsKey = 'sinapse.demoRegistrations';

  get activeRole(): AccountRole {
    return localStorage.getItem(this.roleKey) === 'clinic' ? 'clinic' : 'patient';
  }

  setActive(role: AccountRole): void { localStorage.setItem(this.roleKey, role); }
  clearActive(): void { localStorage.removeItem(this.roleKey); }

  rememberRegistration(email: string, registration: Registration): void {
    const entries = this.readRegistrations();
    entries[email.trim().toLowerCase()] = registration;
    localStorage.setItem(this.registrationsKey, JSON.stringify(entries));
  }

  getRegistration(email: string): Registration | undefined {
    return this.readRegistrations()[email.trim().toLowerCase()];
  }

  private readRegistrations(): Record<string, Registration> {
    try { return JSON.parse(localStorage.getItem(this.registrationsKey) || '{}'); }
    catch { return {}; }
  }
}
