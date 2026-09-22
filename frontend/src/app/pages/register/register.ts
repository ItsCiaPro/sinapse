import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { RouterLink } from '@angular/router';

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
  toastMessage = '';
  loading = false;

  async onSubmit() {
    console.log('ok');

    if (this.passwordConfirm !== this.password) {
      this.toastMessage = 'As senhas não coincidem.';
      return;
    }

    try {
      this.loading = true;

      const { successMessage, errorMessage } = await this.authService.register(this.email, this.password);

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
