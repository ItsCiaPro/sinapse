import { Injectable, computed, signal } from '@angular/core';

export interface ClinicProfessional {
  id: string;
  name: string;
  specialty: string;
  council: string;
  contact: string;
}

export interface ClinicFamilyMember {
  name: string;
  relationship: string;
  notes: string;
  email: string;
  phone: string;
  whatsapp: string;
}

export interface ClinicInsurance {
  category: 'Particular' | 'Pública';
  plan: string;
  cardNumber: string;
  expirationDate: string;
  accommodation: string;
}

export interface ClinicPatient {
  id: string;
  name: string;
  civilName: string;
  birthDate: string;
  cpf: string;
  rg: string;
  sex: string;
  email: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
  zipCode: string;
  street: string;
  complement: string;
  number: string;
  city: string;
  addressState: string;
  country: string;
  neighborhood: string;
  gender: string;
  ethnicity: string;
  birthplace: string;
  birthState: string;
  maritalStatus: string;
  religion: string;
  occupation: string;
  lifeStatus: 'Ativo' | 'Óbito';
  family: ClinicFamilyMember[];
  insurances: ClinicInsurance[];
}

export interface ClinicAttendance {
  id: string;
  patientId: string;
  professionalId: string;
  type: string;
  date: string;
  location: string;
  summary: string;
  exams: string;
  referrals: string;
  notes: string;
}

export interface ClinicAppointment {
  id: string;
  patientId: string;
  professionalId: string;
  type: string;
  date: string;
  location: string;
  notes: string;
  status: 'Agendado' | 'Cancelado';
}

// Records are held in memory and cleared when the authentication session changes.
@Injectable({ providedIn: 'root' })
export class ClinicDemo {
  readonly professionals = signal<ClinicProfessional[]>([]);
  readonly patients = signal<ClinicPatient[]>([]);
  readonly attendances = signal<ClinicAttendance[]>([]);
  readonly appointments = signal<ClinicAppointment[]>([]);
  readonly upcoming = computed(() => this.appointments()
    .filter(item => item.status === 'Agendado' && new Date(item.date).getTime() >= Date.now())
    .sort((a, b) => a.date.localeCompare(b.date)));

  clear(): void {
    this.professionals.set([]);
    this.patients.set([]);
    this.attendances.set([]);
    this.appointments.set([]);
  }

  addProfessional(entry: Omit<ClinicProfessional, 'id'>): void {
    this.professionals.update(items => [{ ...entry, id: crypto.randomUUID() }, ...items]);
  }

  addPatient(entry: Omit<ClinicPatient, 'id'>): boolean {
    const cpf = entry.cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || this.patients().some(item => item.cpf.replace(/\D/g, '') === cpf)) return false;
    this.patients.update(items => [{ ...entry, cpf, id: crypto.randomUUID(),
      family: entry.family.map(member => ({ ...member })),
      insurances: entry.insurances.map(plan => ({ ...plan })) }, ...items]);
    return true;
  }

  searchPatients(query: string): ClinicPatient[] {
    const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
    const text = normalize(query.trim());
    if (!text) return this.patients();
    const digits = query.replace(/\D/g, '');
    return this.patients().filter(patient => normalize(patient.name).includes(text)
      || normalize(patient.civilName).includes(text)
      || patient.id.toLowerCase().includes(text)
      || (digits.length > 0 && patient.cpf.includes(digits)));
  }

  addAttendance(entry: Omit<ClinicAttendance, 'id'>): boolean {
    if (!this.patients().some(patient => patient.id === entry.patientId)) return false;
    this.attendances.update(items => [{ ...entry, id: crypto.randomUUID() }, ...items]);
    return true;
  }

  addAppointment(entry: Omit<ClinicAppointment, 'id'>): boolean {
    if (!this.patients().some(patient => patient.id === entry.patientId)) return false;
    this.appointments.update(items => [{ ...entry, id: crypto.randomUUID() }, ...items]);
    return true;
  }

  updateAppointment(id: string, changes: Omit<ClinicAppointment, 'id'>): boolean {
    if (!this.appointments().some(item => item.id === id) || !this.patients().some(item => item.id === changes.patientId)) return false;
    this.appointments.update(items => items.map(item => item.id === id ? { ...changes, id } : item));
    return true;
  }

  cancelAppointment(id: string): void {
    this.appointments.update(items => items.map(item => item.id === id ? { ...item, status: 'Cancelado' } : item));
  }

  patientName(id: string): string {
    return this.patients().find(item => item.id === id)?.name ?? 'Paciente não encontrado';
  }

  professionalName(id: string): string {
    return id ? this.professionals().find(item => item.id === id)?.name ?? 'Profissional não encontrado' : 'A definir';
  }
}
