import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountMode } from '../../services/account-mode';
import { Supabase } from '../../services/supabase';
import { SidebarNav } from '../../components/sidebar-nav/sidebar-nav';
import { ClinicHeader } from '../../components/clinic-header/clinic-header';

@Component({
  selector: 'app-clinic-layout',
  imports: [SidebarNav, ClinicHeader, RouterOutlet],
  templateUrl: './clinic-layout.html',
  styleUrl: './clinic-layout.css',
})
export class ClinicLayout implements OnInit {
  private accountMode = inject(AccountMode);
  private supabase = inject(Supabase);
  clinicName = 'Minha clínica';

  async ngOnInit(): Promise<void> {
    const user = await this.supabase.getCurrentUser();
    this.clinicName = this.accountMode.getRegistration(user?.email ?? '')?.clinicName || 'Minha clínica';
  }

}
