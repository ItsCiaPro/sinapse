import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClinicDemo } from '../../services/clinic-demo';

@Component({ selector: 'app-clinic-dashboard', imports: [RouterLink], templateUrl: './clinic-dashboard.html', styleUrl: '../clinic-shared.css' })
export class ClinicDashboard { readonly clinic = inject(ClinicDemo); }
