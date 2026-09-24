import { Component } from '@angular/core';

enum filtros {
  tudo = 'Tudo',
  consulta = 'Consulta',
  exame = 'Exame',
  cirurgia = 'Cirurgia',
  prescricao = 'Prescrição',
};

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {

  currentFilter: string = filtros.tudo;

  history = [

    {
      type: filtros.consulta,
      title: 'Avaliação de rotina',
      description: 'Dra. Camila Rocha - Clinica Vital',
      date: '12 Mar. 2026',
      isOpen: false,

      detail: [
        {
          name: 'Localização',
          content: 'Clinica Vital - Unidade Pinheiros',
        },
        {
          name: 'Descrição',
          content: 'Pressão arterial controlada. Manter medicação e retornar em 90 dias com exames de rotina.'
        }
      ],

      attatchments: [
        { title: 'avaliação-helena.pdf', type: 'pdf' }
      ],

    },

    {
      type: filtros.prescricao,
      title: 'Losartana 50mg - 1x/dia',
      description: 'Dra. Camila Rocha - 30 dias',
      date: '02 Fev. 2026',
      isOpen: false,

      detail: [
        {
          name: 'Descrição',
          content: 'Tomar pela manhã em jejum. Renovação sujeita a nova avaliação.'
        }
      ],

      attatchments: [
      ],

    },

    {
      type: filtros.cirurgia,
      title: 'Apendicectomia',
      description: 'Dra. Camila Rocha',
      date: '30 Out. 2026',
      isOpen: false,

      detail: [
        {
          name: 'Cuidados Antes',
          content: 'Jejum absoluto 8 horas antes'
        },
        {
          name: 'Cuidados Após',
          content: 'Evitar esforço físico, alimentação leve'
        },
        {
          name: 'Prescrições',
          content: 'Analgésicos e anti-inflamatórios'
        }
      ],

      attatchments: [
      ],

    },

  ]

}
