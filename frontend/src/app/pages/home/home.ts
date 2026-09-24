import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { inject } from '@angular/core';
import { Supabase } from '../../services/supabase';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

enum filtros {
  tudo = 'Tudo',
  consulta = 'Consulta',
  exame = 'Exame',
  cirurgia = 'Cirurgia',
  prescricao = 'Prescrição',
};

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private authService = inject(Auth);
  private supabaseService = inject(Supabase);
  currentUser$ = this.supabaseService.currentUser$

  toastMessage = '';
  currentFilter : string = filtros.tudo;

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

  async onLogout() {
    console.log('ok');

    try {

      const { successMessage, errorMessage } = await this.authService.logOut();

      if (errorMessage) {
        this.toastMessage = errorMessage ?? '';
      } else {
        this.toastMessage = successMessage ?? '';
      }
    }

    finally {
      console.log(this.toastMessage);
    }
  }
}
