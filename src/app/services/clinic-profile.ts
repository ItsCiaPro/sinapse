import { Injectable, signal } from '@angular/core';

export interface ClinicProfileData {
  code: string;
  name: string;
  email: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
  zipCode: string;
  street: string;
  complement: string;
  number: string;
  city: string;
  state: string;
  country: string;
  neighborhood: string;
}

@Injectable({ providedIn: 'root' })
export class ClinicProfile {
  readonly profile = signal<ClinicProfileData>(this.empty());
  private storageKey = '';

  private empty(name = 'Minha clínica'): ClinicProfileData {
    return { code: '', name, email: '', phone1: '', phone2: '', whatsapp: '',
      zipCode: '', street: '', complement: '', number: '', city: '', state: '', country: 'Brasil', neighborhood: '' };
  }

  initialize(userId: string, registeredName = ''): void {
    this.storageKey = `sinapse.clinicProfile.${userId}`;
    const defaults = this.empty(registeredName.trim() || 'Minha clínica');
    try {
      const saved = JSON.parse(localStorage.getItem(this.storageKey) || 'null');
      this.profile.set(saved && typeof saved === 'object' ? { ...defaults, ...saved } : defaults);
    } catch { this.profile.set(defaults); }
  }

  save(entry: ClinicProfileData): boolean {
    if (!this.storageKey || !entry.code.trim() || !entry.name.trim() || !entry.zipCode.trim() ||
        !entry.street.trim() || !entry.complement.trim() || !entry.number.trim() || !entry.city.trim() ||
        !entry.state.trim() || !entry.country.trim() || !entry.neighborhood.trim()) return false;
    const data = Object.fromEntries(Object.entries(entry).map(([key, value]) => [key, value.trim()])) as unknown as ClinicProfileData;
    try { localStorage.setItem(this.storageKey, JSON.stringify(data)); }
    catch { return false; }
    this.profile.set(data);
    return true;
  }
}
