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

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'register', component: Register, canActivate: [guestGuard] },
    { path: 'login', component: Login, canActivate: [guestGuard] },

    {
        path: '',
        component: RecordLayout,
        canActivate: [authGuard],
        children: [
            { path: 'home', component: Home},
            { path: 'history', component: History},
            { path: 'profile', component: Profile},
            { path: 'share', component: Share},
        ]
    },
    
    { path: '**', redirectTo: 'login' },
];
