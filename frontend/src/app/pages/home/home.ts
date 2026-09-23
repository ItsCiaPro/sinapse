import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { inject } from '@angular/core';
import { Supabase } from '../../services/supabase';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

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
