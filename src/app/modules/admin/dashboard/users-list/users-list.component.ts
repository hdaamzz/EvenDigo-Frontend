import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../../../../core/models/userModel';
import Notiflix from 'notiflix';
import { AdminUsersService } from '../../../../core/services/admin/admin.users.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-users-list',
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  usersList: User[] = [];
  loading = true;
  visible: boolean = false;
  position: string = 'right';
  isMobile: boolean = false;
  selectedUser: User = {
    _id: '',
    name: '',
    email: ''
  }


  constructor(private userService: AdminUsersService) { }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }
  fetchUserData() {
    this.loading = true;
    this.userService.usersList().pipe(
      tap((response) => {
        if (response.success) {
          this.usersList = response.data;
          console.log('User list:', this.usersList);
        } else {
          console.error('Failed to fetch users:', response.message);
          Notiflix.Notify.failure(response.message);
        }
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        Notiflix.Notify.failure('Error fetching users');
        return of(null);
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.fetchUserData();
  }


  getInitialColor(name: string): string {
    const colors = [
      'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-red-600',
      'bg-yellow-600', 'bg-pink-600', 'bg-indigo-600', 'bg-teal-600',
      'bg-orange-800', 'bg-cyan-600', 'bg-lime-600', 'bg-emerald-600',
      'bg-rose-600', 'bg-amber-600', 'bg-fuchsia-600', 'bg-violet-600',
    ];
    const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  }

  showDialog(id: string, position: string) {
    this.userService.userDetails(id).subscribe({
      next: (user) => {
        this.selectedUser = user || { _id: '', name: '', email: '' };
        this.position = this.isMobile ? 'bottom' : position;
        this.visible = true;
      },
      error: (error) => {
        console.error('Error showing user dialog:', error);
      },
    });
  }

  hideDialog() {
    this.visible = false;
  }

  blockUser(id: string) {
    this.userService.blockUser(id).subscribe({
      next: () => {
        this.fetchUserData();
        Notiflix.Notify.success('Successfully Blocked');
        this.hideDialog();
      },
      error: (err) => {
        console.error('Error blocking user:', err);
        Notiflix.Notify.failure('User Blocking Failed!');
      },
    });
  }
  unblockUser(id: string) {
    this.userService.unblockUser(id).subscribe({
      next: () => {
        this.fetchUserData();
        Notiflix.Notify.success('Successfully Unblocked');
        this.hideDialog();
      },
      error: (err) => {
        console.error('Error unblocking user:', err);
        Notiflix.Notify.failure('User Unblocking Failed!');
      },
    });
  }
}
