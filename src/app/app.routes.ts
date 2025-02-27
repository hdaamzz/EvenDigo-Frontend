import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/user/register/register.component';
import { HomeComponent } from './modules/user/home/home.component';
import { LoginComponent } from './modules/user/login/login.component';
import { isLogout } from './core/services/user/guards/auth.guard';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';

export const routes: Routes = [
    //user - side 
    {
        path:'',
        component:HomeComponent
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
    //admin - side
    {
        path:'admin/login',
        component:AdminLoginComponent
    },
    {
        path:'admin/dashboard',
        component:DashboardComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
];
