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

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'register', component: Register, canActivate: [guestGuard] },
    { path: 'login', component: Login, canActivate: [guestGuard] },
    { path: 'acesso-demo', component: DemoAccessPage },

    {
        path: '',
        component: RecordLayout,
        canActivate: [authGuard],
        children: [
            { path: 'home', component: Home, data: { title: 'Início' }},
            { path: 'history', component: History, data: { title: 'Histórico' }},
            { path: 'profile', component: Profile, data: { title: 'Perfil' }},
            { path: 'share', component: Share, data: { title: 'Compartilhar' }},
        ]
    },
    
    { path: '**', redirectTo: 'login' },
];
