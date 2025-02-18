import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/user/register/register.component';
import { HomeComponent } from './modules/user/home/home.component';
import { LoginComponent } from './modules/user/login/login.component';

export const routes: Routes = [
    //user - side 
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'login',
        component:LoginComponent
    }
];
