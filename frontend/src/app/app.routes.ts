import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from '../guards/auth.guard';
import { guestGuard } from '../guards/guest.guard';
import { Profile } from './pages/profile/profile';
import { Share } from './pages/share/share';
import { History } from './pages/history/history';
import { RecordLayout } from './layouts/record-layout/record-layout';
import { DemoAccessPage } from './pages/demo-access/demo-access';
import { accountRoleGuard } from '../guards/account-role.guard';
import { ClinicLayout } from './layouts/clinic-layout/clinic-layout';
import { ClinicDashboard } from './pages/clinic-dashboard/clinic-dashboard';
import { ClinicProfessionals } from './pages/clinic-professionals/clinic-professionals';
import { ClinicAttendances } from './pages/clinic-attendances/clinic-attendances';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'register', component: Register, canActivate: [guestGuard] },
    { path: 'login', component: Login, canActivate: [guestGuard] },
    { path: 'acesso-demo', component: DemoAccessPage },

    {
        path: 'clinica', component: ClinicLayout,
        canActivate: [authGuard, accountRoleGuard('clinic')],
        children: [
            { path: '', component: ClinicDashboard, data: { title: 'Visão geral' } },
            { path: 'profissionais', component: ClinicProfessionals, data: { title: 'Profissionais' } },
            { path: 'atendimentos', component: ClinicAttendances, data: { title: 'Atendimentos' } },
        ],
    },

    {
        path: '',
        component: RecordLayout,
        canActivate: [authGuard, accountRoleGuard('patient')],
        children: [
            { path: 'home', component: Home, data: { title: 'Início' }},
            { path: 'history', component: History, data: { title: 'Histórico' }},
            { path: 'profile', component: Profile, data: { title: 'Perfil' }},
            { path: 'share', component: Share, data: { title: 'Compartilhar' }},
        ]
    },
    
    { path: '**', redirectTo: 'login' },
];
