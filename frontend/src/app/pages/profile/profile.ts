import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type ProfileRow = { sectionTitle: string; sectionData: string };
type ProfileSection = { sectionTitle: string; sectionRows: ProfileRow[] };
type AlertType = 'allergy' | 'condition' | 'other';
type ClinicalAlert = { title: string; description: string; type: AlertType };

@Component({
  selector: 'app-profile',
  imports: [FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  @ViewChild('editDialog') editDialog?: ElementRef<HTMLDialogElement>;
  @ViewChild('alertDialog') alertDialog?: ElementRef<HTMLDialogElement>;

  sections: ProfileSection[] = [
    {
      sectionTitle: 'Dados do paciente',
      sectionRows: [
        { sectionTitle: 'Nome', sectionData: 'Helena Duarte' },
        { sectionTitle: 'Nome social', sectionData: '' },
        { sectionTitle: 'Nascimento', sectionData: '14/07/1983' },
        { sectionTitle: 'CPF', sectionData: '123.456.789-01' },
        { sectionTitle: 'RG', sectionData: '12.345.678-9' },
      ],
    },
    {
      sectionTitle: 'Informações pessoais',
      sectionRows: [
        { sectionTitle: 'Sexo', sectionData: 'Feminino' },
        { sectionTitle: 'Etnia', sectionData: 'Branco(a)' },
        { sectionTitle: 'Estado civil', sectionData: 'Casado(a)' },
        { sectionTitle: 'Naturalidade', sectionData: 'Salvador' },
      ],
    },
    {
      sectionTitle: 'Convênio',
      sectionRows: [
        { sectionTitle: 'Operadora', sectionData: 'Bradesco Saúde' },
        { sectionTitle: 'Tipo', sectionData: 'Particular' },
        { sectionTitle: 'Plano', sectionData: 'Top Nacional R1' },
        { sectionTitle: 'Nº da carteirinha', sectionData: '852.190.432109.008' },
        { sectionTitle: 'Validade', sectionData: '12/2028' },
        { sectionTitle: 'Acomodação', sectionData: 'Apartamento' },
        { sectionTitle: 'Titular', sectionData: 'Helena Duarte' },
      ],
    },
  ];

  clinicalAlerts: ClinicalAlert[] = [
    { title: 'Alergia a penicilina', description: 'Reação cutânea grave registrada em 2019.', type: 'allergy' },
    { title: 'Hipertensão arterial', description: 'Em tratamento contínuo com Losartana 50mg.', type: 'condition' },
  ];

  editingSectionIndex = 0;
  editingRows: ProfileRow[] = [];
  newAlert: ClinicalAlert = { title: '', description: '', type: 'allergy' };

  openEdit(index: number): void {
    this.editingSectionIndex = index;
    this.editingRows = this.sections[index].sectionRows.map(row => ({ ...row }));
    this.editDialog?.nativeElement.showModal();
  }

  saveEdit(): void {
    this.sections[this.editingSectionIndex].sectionRows = this.editingRows.map(row => ({ ...row }));
    this.editDialog?.nativeElement.close();
  }

  openAlert(): void {
    this.newAlert = { title: '', description: '', type: 'allergy' };
    this.alertDialog?.nativeElement.showModal();
  }

  saveAlert(): void {
    const title = this.newAlert.title.trim();
    if (!title) return;
    this.clinicalAlerts.push({ ...this.newAlert, title, description: this.newAlert.description.trim() });
    this.alertDialog?.nativeElement.close();
  }
}
