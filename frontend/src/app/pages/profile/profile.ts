import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  sections = [
    {
      sectionTitle: 'Dados do Usuário',
      sectionRows: [
        {sectionTitle: 'Nome', sectionData: 'Helena Duarte'},
        {sectionTitle: 'Nome Social', sectionData: ''},
        {sectionTitle: 'Nascimento', sectionData: '14/07/1983'},
        {sectionTitle: 'CPF', sectionData: '123.456.789-01'},
        {sectionTitle: 'RG', sectionData: '12.345.678-9'},
      ]
    },

    {
      sectionTitle: 'Dados do Sensíveis',
      sectionRows: [
        {sectionTitle: 'Sexo', sectionData: 'Feminino'},
        {sectionTitle: 'Etnia', sectionData: 'Branco(a)'},
        {sectionTitle: 'Estado Civil', sectionData: 'Casado(a)'},
        {sectionTitle: 'Naturalidade', sectionData: 'Salvador'},
        {sectionTitle: 'RG', sectionData: '12.345.678-9'},
      ]
    },

    {
      sectionTitle: 'Convênio',
      sectionRows: [
        {sectionTitle: 'Convênio', sectionData: 'Bradesco Saúde'},
        {sectionTitle: 'Tipo de Convênio', sectionData: 'Particular'},
        {sectionTitle: 'Plano', sectionData: 'Top Nacional R1'},
        {sectionTitle: 'N° Carteirinha', sectionData: '852.190.432109.008'},
        {sectionTitle: 'Validade', sectionData: '12/2028'},
        {sectionTitle: 'Acomodação', sectionData: 'Apartamento'},
        {sectionTitle: 'Titular', sectionData: 'Helena Duarte'},
      ]
    },

  ]

  clinicalAlerts = [

    {
      sectionTitle: 'Alertas Clínicos',
      sectionRows: [
        {sectionTitle: 'Alergia a penicilina', sectionData: 'Reação cutânea grave tegistrada em 2019'},
        {sectionTitle: 'Hipertensão arterial', sectionData: 'Em tratamento contínuo com Losartana 50mg'},
      ]
    },

  ]

}
