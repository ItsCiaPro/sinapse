import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClinicAppointment, ClinicDemo } from '../../services/clinic-demo';

@Component({ selector: 'app-clinic-appointments', imports: [FormsModule, RouterLink], templateUrl: './clinic-appointments.html', styleUrl: '../clinic-shared.css' })
export class ClinicAppointments {
  readonly clinic = inject(ClinicDemo);
  readonly types = ['Consulta', 'Exame', 'Cirurgia', 'Procedimento', 'Retorno', 'Outro'];
  readonly weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  month = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  selectedDay = this.localDate(new Date());
  patientQuery = '';
  formOpen = false;
  editingId = '';
  draft = this.emptyDraft();

  get monthLabel(): string { return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(this.month); }
  get minDateTime(): string { return `${this.localDate(new Date())}T${new Date().toTimeString().slice(0, 5)}`; }
  get matchingPatients() { return this.clinic.searchPatients(this.patientQuery); }
  get calendarDays(): { key: string; day: number; count: number }[] {
    const offset = (this.month.getDay() + 6) % 7;
    const count = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 0).getDate();
    return Array.from({ length: Math.ceil((offset + count) / 7) * 7 }, (_, index) => {
      const day = index - offset + 1;
      const key = day > 0 && day <= count ? this.localDate(new Date(this.month.getFullYear(), this.month.getMonth(), day)) : '';
      return { key, day: key ? day : 0, count: key ? this.clinic.appointments().filter(item => item.date.startsWith(key) && item.status === 'Agendado').length : 0 };
    });
  }
  get selectedAppointments(): ClinicAppointment[] {
    return this.clinic.appointments().filter(item => item.date.startsWith(this.selectedDay)).sort((a, b) => a.date.localeCompare(b.date));
  }
  get orderedAppointments(): ClinicAppointment[] {
    return [...this.clinic.appointments()].sort((a, b) => a.date.localeCompare(b.date));
  }

  private localDate(day: Date): string {
    return `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
  }
  private emptyDraft(): Omit<ClinicAppointment, 'id'> {
    return { patientId: '', professionalId: '', type: 'Consulta', date: '', location: '', notes: '', status: 'Agendado' };
  }
  changeMonth(delta: number): void {
    this.month = new Date(this.month.getFullYear(), this.month.getMonth() + delta, 1);
    this.selectedDay = this.localDate(this.month);
  }
  openForm(appointment?: ClinicAppointment): void {
    this.editingId = appointment?.id ?? '';
    this.draft = appointment ? { patientId: appointment.patientId, professionalId: appointment.professionalId, type: appointment.type,
      date: appointment.date, location: appointment.location, notes: appointment.notes, status: appointment.status } : this.emptyDraft();
    this.patientQuery = ''; this.formOpen = true;
  }
  save(): void {
    const d = this.draft;
    if (!d.patientId || !d.type || !d.date || d.date < this.minDateTime || !d.location.trim()) return;
    const entry = { ...d, location: d.location.trim(), notes: d.notes.trim() };
    const saved = this.editingId ? this.clinic.updateAppointment(this.editingId, entry) : this.clinic.addAppointment(entry);
    if (!saved) return;
    this.selectedDay = d.date.slice(0, 10);
    const [year, month] = this.selectedDay.split('-').map(Number);
    this.month = new Date(year, month - 1, 1);
    this.formOpen = false; this.editingId = ''; this.draft = this.emptyDraft();
  }
  cancel(appointment: ClinicAppointment): void {
    this.clinic.cancelAppointment(appointment.id);
    if (this.editingId === appointment.id) { this.formOpen = false; this.editingId = ''; }
  }
}
