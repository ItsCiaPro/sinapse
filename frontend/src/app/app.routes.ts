import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from '../guards/auth.guard';
import { guestGuard } from '../guards/guest.guard';
import { Profile } from './pages/profile/profile';
import { Share } from './pages/share/share';

export const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: Register, canActivate: [guestGuard]},
    {path: 'login', component: Login, canActivate: [guestGuard]},

    {path: 'home', component: Home, canActivate: [authGuard]},
    {path: 'profile', component: Profile, canActivate: [authGuard]},
    {path: 'share', component: Share, canActivate: [authGuard]},

    {path: '**', redirectTo: 'login'},
];
