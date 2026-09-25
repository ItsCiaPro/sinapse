import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { RouterLink } from '@angular/router';
import { AccountRole } from '../../services/account-mode';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(Auth);

  email = '';
  password = '';
  passwordConfirm = '';
  selectedRole: AccountRole | null = null;
  clinicName = '';
  acceptedTerms = false;
  toastMessage = '';
  loading = false;

  async onSubmit() {

    if (!this.selectedRole || (this.selectedRole === 'clinic' && !this.clinicName.trim())) {
      this.toastMessage = 'Escolha o tipo de conta e informe o nome da clínica.';
      return;
    }

    if (!this.acceptedTerms) {
      this.toastMessage = 'Leia e aceite as condições de uso das informações para continuar.';
      return;
    }

    if (this.passwordConfirm !== this.password) {
      this.toastMessage = 'As senhas não coincidem.';
      return;
    }

    try {
      this.loading = true;

      const { successMessage, errorMessage } = await this.authService.register(this.email, this.password, this.selectedRole, this.clinicName);

      if (errorMessage) {
        this.toastMessage = errorMessage ?? '';
      } else {
        this.toastMessage = successMessage ?? '';
      }
    }

    finally {
      this.loading = false;
      console.log(this.toastMessage);
    }
  }
}
