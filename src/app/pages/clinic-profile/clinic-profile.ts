import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClinicProfile, ClinicProfileData } from '../../services/clinic-profile';

@Component({
  selector: 'app-clinic-profile',
  imports: [FormsModule],
  templateUrl: './clinic-profile.html',
  styleUrls: ['../profile/profile.css', './clinic-profile.css'],
})
export class ClinicProfilePage {
  readonly clinic = inject(ClinicProfile);
  editing = false;
  error = '';
  draft: ClinicProfileData = { ...this.clinic.profile() };

  edit(): void { this.draft = { ...this.clinic.profile() }; this.editing = true; this.error = ''; }
  cancel(): void { this.editing = false; this.error = ''; }
  save(): void {
    if (!this.clinic.save(this.draft)) {
      this.error = 'Confira os campos obrigatórios e tente novamente.';
      return;
    }
    this.editing = false;
    this.error = '';
  }
}
