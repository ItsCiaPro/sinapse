import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-sidebar-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-nav.html',
  styleUrl: './sidebar-nav.css',
})
export class SidebarNav {
  @Input() mode: 'patient' | 'clinic' = 'patient';
  private authService = inject(Auth);
  toastMessage = '';
  loading = false;

  isOpen = false;

  async logOut() {
    try {
      this.loading = true;
      const { successMessage, errorMessage } = await this.authService.logOut();

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
