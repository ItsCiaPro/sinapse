import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClinicAttendance, ClinicDemo } from '../../services/clinic-demo';

@Component({ selector: 'app-clinic-attendances', imports: [FormsModule, RouterLink], templateUrl: './clinic-attendances.html', styleUrl: '../clinic-shared.css' })
export class ClinicAttendances {
  readonly clinic = inject(ClinicDemo);
  readonly types = ['Consulta', 'Exame', 'Cirurgia', 'Procedimento', 'Retorno', 'Outro'];
  formOpen = false;
  patientQuery = '';
  typeFilter = 'Todos';
  draft: Omit<ClinicAttendance, 'id'> = this.emptyDraft();

  get matchingPatients() { return this.clinic.searchPatients(this.patientQuery); }
  get filteredRecords() {
    return this.clinic.attendances().filter(item => this.typeFilter === 'Todos' || item.type === this.typeFilter);
  }

  private emptyDraft(): Omit<ClinicAttendance, 'id'> {
    return { patientId: '', professionalId: '', type: 'Consulta', date: '', location: '', summary: '', exams: '', referrals: '', notes: '' };
  }
  save(): void {
    const d = this.draft;
    if (!d.patientId || !d.professionalId || !d.type || !d.date || !d.location.trim() || !d.summary.trim()) return;
    if (!this.clinic.addAttendance({ ...d, location: d.location.trim(), summary: d.summary.trim() })) return;
    this.draft = this.emptyDraft(); this.patientQuery = ''; this.formOpen = false;
  }
}
