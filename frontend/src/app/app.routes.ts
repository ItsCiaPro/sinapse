import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from '../guards/auth.guard';
import { guestGuard } from '../guards/guest.guard';

export const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', component: Home, canActivate: [authGuard]},
    {path: 'register', component: Register, canActivate: [guestGuard]},
    {path: 'login', component: Login, canActivate: [guestGuard]},

    {path: '**', redirectTo: 'home'},
];
