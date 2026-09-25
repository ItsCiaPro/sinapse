import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { AccountMode } from '../../services/account-mode';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-clinic-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './clinic-layout.html',
  styleUrl: './clinic-layout.css',
})
export class ClinicLayout implements OnInit {
  private auth = inject(Auth);
  private accountMode = inject(AccountMode);
  private supabase = inject(Supabase);
  clinicName = 'Minha clínica';
  menuOpen = false;

  async ngOnInit(): Promise<void> {
    const user = await this.supabase.getCurrentUser();
    this.clinicName = this.accountMode.getRegistration(user?.email ?? '')?.clinicName || 'Minha clínica';
  }

  logOut(): void { void this.auth.logOut(); }
}
