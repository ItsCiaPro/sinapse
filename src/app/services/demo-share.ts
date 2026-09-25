import { Injectable } from '@angular/core';

export type DemoAccess = { expiresAt: number; scopes: string[]; url: string };
const STORAGE_KEY = 'sinapse-demo-access';

@Injectable({ providedIn: 'root' })
export class DemoShare {
  getActive(): DemoAccess | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;
      const access = JSON.parse(saved) as DemoAccess;
      if (!Number.isFinite(access.expiresAt) || access.expiresAt <= Date.now() ||
          !Array.isArray(access.scopes) || typeof access.url !== 'string') {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return access;
    } catch { return null; }
  }

  generate(durationHours: number, scopes: string[]): DemoAccess {
    const expiresAt = Date.now() + durationHours * 60 * 60 * 1000;
    const url = new URL('/acesso', window.location.origin);
    url.searchParams.set('ate', String(expiresAt));
    url.searchParams.set('itens', scopes.join(','));
    const access = { expiresAt, scopes, url: url.toString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(access));
    return access;
  }
}
