import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClinicDemo, ClinicFamilyMember, ClinicInsurance, ClinicPatient } from '../../services/clinic-demo';

@Component({ selector: 'app-clinic-patients', imports: [FormsModule], templateUrl: './clinic-patients.html', styleUrl: '../clinic-shared.css' })
export class ClinicPatients {
  readonly clinic = inject(ClinicDemo);
  query = '';
  formOpen = false;
  error = '';
  draft = this.emptyPatient();
  familyDraft = this.emptyFamily();
  insuranceDraft = this.emptyInsurance();

  get results(): ClinicPatient[] { return this.clinic.searchPatients(this.query); }

  private emptyPatient(): Omit<ClinicPatient, 'id'> {
    return { name: '', civilName: '', birthDate: '', cpf: '', rg: '', sex: '', email: '', phone1: '', phone2: '', whatsapp: '',
      zipCode: '', street: '', complement: '', number: '', city: '', addressState: '', country: 'Brasil', neighborhood: '',
      gender: '', ethnicity: '', birthplace: '', birthState: '', maritalStatus: '', religion: '', occupation: '', lifeStatus: 'Ativo',
      family: [], insurances: [] };
  }
  private emptyFamily(): ClinicFamilyMember { return { name: '', relationship: '', notes: '', email: '', phone: '', whatsapp: '' }; }
  private emptyInsurance(): ClinicInsurance { return { category: 'Particular', plan: '', cardNumber: '', expirationDate: '', indefinite: false, accommodation: '' }; }

  addFamily(): void {
    const f = this.familyDraft;
    if (!f.name.trim() || !f.relationship.trim() || !f.email.trim() || !f.phone.trim() || !f.whatsapp.trim()) {
      this.error = 'Preencha nome, parentesco e contatos do familiar antes de adicioná-lo.'; return;
    }
    this.draft.family.push({ ...f }); this.familyDraft = this.emptyFamily(); this.error = '';
  }

  addInsurance(): void {
    const p = this.insuranceDraft;
    if (!p.plan.trim() || !p.cardNumber.trim() || !p.accommodation.trim() || (!p.indefinite && !p.expirationDate)) {
      this.error = 'Preencha plano, carteirinha, acomodação e validade do convênio.'; return;
    }
    this.draft.insurances.push({ ...p, expirationDate: p.indefinite ? '' : p.expirationDate });
    this.insuranceDraft = this.emptyInsurance(); this.error = '';
  }

  save(): void {
    const d = this.draft;
    if (!d.name.trim() || !d.birthDate || !d.rg.trim() || !d.sex || !d.email.trim() || !d.phone1.trim() || !d.whatsapp.trim() || !d.zipCode.trim() || !d.street.trim() || !d.number.trim() || !d.city.trim() || !d.addressState.trim() || !d.country.trim() || !d.neighborhood.trim() || !d.lifeStatus) return;
    if (d.cpf.replace(/\D/g, '').length !== 11) { this.error = 'Informe um CPF com 11 dígitos.'; return; }
    if (!this.clinic.addPatient(d)) { this.error = 'Este CPF já está cadastrado.'; return; }
    this.draft = this.emptyPatient(); this.familyDraft = this.emptyFamily(); this.insuranceDraft = this.emptyInsurance();
    this.formOpen = false; this.error = '';
  }
}
