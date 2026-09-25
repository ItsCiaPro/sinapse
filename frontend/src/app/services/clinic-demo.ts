import { Injectable, signal } from '@angular/core';

export interface ClinicProfessional {
  id: string;
  name: string;
  specialty: string;
  council: string;
  contact: string;
}

export interface ClinicAttendance {
  id: string;
  patient: string;
  professionalId: string;
  type: string;
  date: string;
  location: string;
  summary: string;
  exams: string;
  referrals: string;
  notes: string;
}

// The clinic workspace is a front-end prototype. Clinical information stays in memory.
@Injectable({ providedIn: 'root' })
export class ClinicDemo {
  readonly professionals = signal<ClinicProfessional[]>([]);
  readonly attendances = signal<ClinicAttendance[]>([]);

  addProfessional(entry: Omit<ClinicProfessional, 'id'>): void {
    this.professionals.update(items => [{ ...entry, id: crypto.randomUUID() }, ...items]);
  }

  addAttendance(entry: Omit<ClinicAttendance, 'id'>): void {
    this.attendances.update(items => [{ ...entry, id: crypto.randomUUID() }, ...items]);
  }

  professionalName(id: string): string {
    return this.professionals().find(item => item.id === id)?.name ?? 'Profissional não encontrado';
  }
}
