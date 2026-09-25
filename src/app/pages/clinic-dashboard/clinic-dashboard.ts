import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClinicDemo } from '../../services/clinic-demo';

@Component({ selector: 'app-clinic-dashboard', imports: [RouterLink], templateUrl: './clinic-dashboard.html', styleUrl: '../clinic-shared.css' })
export class ClinicDashboard {
  readonly clinic = inject(ClinicDemo);
  selectedDay = this.dayKey(new Date());

  get weekDays(): { key: string; day: string; weekday: string; count: number }[] {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const key = this.dayKey(date);
      return { key, day: String(date.getDate()).padStart(2, '0'),
        weekday: new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date).replace('.', ''),
        count: this.clinic.appointments().filter(item => item.status === 'Agendado' && item.date.startsWith(key)).length };
    });
  }

  get selectedAppointments() {
    return this.clinic.appointments().filter(item => item.status === 'Agendado' && item.date.startsWith(this.selectedDay))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  private dayKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
}
