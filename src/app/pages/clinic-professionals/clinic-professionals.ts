import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClinicDemo, ClinicProfessional } from '../../services/clinic-demo';

@Component({ selector: 'app-clinic-professionals', imports: [FormsModule], templateUrl: './clinic-professionals.html', styleUrl: '../clinic-shared.css' })
export class ClinicProfessionals {
  readonly demo = inject(ClinicDemo);
  formOpen = false;
  draft: Omit<ClinicProfessional, 'id'> = this.emptyDraft();
  private emptyDraft(): Omit<ClinicProfessional, 'id'> { return { name: '', specialty: '', council: '', contact: '' }; }
  save(): void {
    if (!this.draft.name.trim() || !this.draft.specialty.trim() || !this.draft.council.trim()) return;
    this.demo.addProfessional({ ...this.draft, name: this.draft.name.trim(), specialty: this.draft.specialty.trim(), council: this.draft.council.trim() });
    this.draft = this.emptyDraft(); this.formOpen = false;
  }
}
