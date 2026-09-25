import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClinicAttendance, ClinicDemo } from '../../services/clinic-demo';

@Component({ selector: 'app-clinic-attendances', imports: [FormsModule, RouterLink], templateUrl: './clinic-attendances.html', styleUrl: '../clinic-shared.css' })
export class ClinicAttendances {
  readonly demo = inject(ClinicDemo);
  readonly types = ['Consulta', 'Exame', 'Cirurgia', 'Procedimento', 'Retorno', 'Outro'];
  formOpen = false;
  draft: Omit<ClinicAttendance, 'id'> = this.emptyDraft();
  private emptyDraft(): Omit<ClinicAttendance, 'id'> {
    return { patient: '', professionalId: '', type: 'Consulta', date: '', location: '', summary: '', exams: '', referrals: '', notes: '' };
  }
  save(): void {
    const d = this.draft;
    if (!d.patient.trim() || !d.professionalId || !d.type || !d.date || !d.location.trim() || !d.summary.trim()) return;
    this.demo.addAttendance({ ...d, patient: d.patient.trim(), location: d.location.trim(), summary: d.summary.trim() });
    this.draft = this.emptyDraft(); this.formOpen = false;
  }
}
