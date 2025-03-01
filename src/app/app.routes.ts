import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/user/register/register.component';
import { HomeComponent } from './modules/user/home/home.component';
import { LoginComponent } from './modules/user/login/login.component';
import { isAdmin, isLogout } from './core/guards/user/user.auth.guard';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { adminIsLogged, adminIsLogout } from './core/guards/admin/admin.auth.guard';
import { ProfileComponent } from './modules/user/profile/profile.component';
import { ProfileDetailsComponent } from './modules/user/profile/profile.details/profile.details.component';
import { ProfileEventsComponent } from './modules/user/profile/profile.events/profile.events.component';

export const routes: Routes = [
    //user - side 
    {
        path:'',
        component:HomeComponent,
        canActivate:[isAdmin]
    },
    {
        path:'register',
        component:RegisterComponent,
        canActivate:[isLogout]
    },
    {
        path:'login',
        component:LoginComponent,
        canActivate:[isLogout]
    },
    {
        path:'profile',
        component:ProfileComponent,
        children: [
            {
                path: '',
                redirectTo: 'details',
                pathMatch: 'full'
            },
            {
                path: 'details',
                component: ProfileDetailsComponent
            },
            {
                path: 'events',
                component: ProfileEventsComponent
            }
        ]
    },
    //admin - side
    {
        path:'admin/login',
        component:AdminLoginComponent,
        canActivate:[adminIsLogout]
    },
    {
        path:'admin/dashboard',
        component:DashboardComponent,
        canActivate:[adminIsLogged]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
];
