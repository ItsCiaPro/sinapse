import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountMode } from '../../services/account-mode';
import { Supabase } from '../../services/supabase';
import { SidebarNav } from '../../components/sidebar-nav/sidebar-nav';
import { ClinicHeader } from '../../components/clinic-header/clinic-header';
import { ClinicProfile } from '../../services/clinic-profile';

@Component({
  selector: 'app-clinic-layout',
  imports: [SidebarNav, ClinicHeader, RouterOutlet],
  templateUrl: './clinic-layout.html',
  styleUrl: './clinic-layout.css',
})
export class ClinicLayout implements OnInit {
  private accountMode = inject(AccountMode);
  private supabase = inject(Supabase);
  readonly profile = inject(ClinicProfile);

  async ngOnInit(): Promise<void> {
    const user = await this.supabase.getCurrentUser();
    if (user) this.profile.initialize(user.id, this.accountMode.getRegistration(user.email ?? '')?.clinicName);
  }

}
