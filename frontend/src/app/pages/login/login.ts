import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccountRole } from '../../services/account-mode';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth)

  email = '';
  password = '';
  selectedRole: AccountRole | null = null;
  toastMessage = '';
  loading = false;

  async onSubmit() {

    if (!this.selectedRole) {
      this.toastMessage = 'Escolha o espaço que deseja acessar.';
      return;
    }

    try {
      this.loading = true;

      const { successMessage, errorMessage } = await this.authService.logIn(this.email, this.password, this.selectedRole);

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
