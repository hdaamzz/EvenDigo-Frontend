import { Component, HostListener, OnInit } from '@angular/core';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { UsersListComponent } from "./users-list/users-list.component";
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../core/store/auth/auth.actions';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardHomeComponent, UsersListComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashBoard: boolean = false;
  userList: boolean = false;
  sidebarOpen: boolean = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.showDashboard();
    this.sidebarOpen = window.innerWidth >= 1024;
  }
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
  closeSidebarOnMobile(): void {
    if (window.innerWidth < 1024) {
      this.sidebarOpen = false;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth >= 1024) {
      this.sidebarOpen = true;
    } else {
      this.sidebarOpen = false;
    }
  }
  showDashboard(): void {
    if (!this.dashBoard) {
      this.userList = false;
      this.dashBoard = true;
    }
  }

  showUserList(): void {
    if (!this.userList) {
      this.dashBoard = false;
      this.userList = true;
    }
  }
  logout(): void {
    this.store.dispatch(AuthActions.logout());
    Notiflix.Notify.success('Admin Logout Successfully')
  }

}
