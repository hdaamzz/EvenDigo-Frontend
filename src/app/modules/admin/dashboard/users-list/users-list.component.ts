import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../../../../core/models/userModel';
import Notiflix from 'notiflix';
import { AdminUsersService } from '../../../../core/services/admin/admin.users.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-users-list',
  imports: [CommonModule,DialogModule ,ButtonModule ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  usersList: User[] = [];
  loading = true;
  visible: boolean = false;
  position: string = 'right';
  isMobile: boolean = false;
  selectedUser: User={
    _id: '',
    name: '',
    email: ''
  }


  constructor(private userService: AdminUsersService) {}
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }
  fetchUserData() {
    this.userService.usersList().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.usersList = response.data;
          console.log('User list:', this.usersList);
        } else {
          console.error('Failed to fetch users:', response.message);
          Notiflix.Notify.failure(response.message);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error fetching users:', error);
        Notiflix.Notify.failure('Error fetching users');
      }
    });
  }

  ngOnInit(): void {
    this.checkScreenSize();

    setTimeout(() => {
      this.fetchUserData();
      
    }, 300);
  }

  getInitialColor(name: string): string {
    const colors = [
      'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-red-600', 
      'bg-yellow-600', 'bg-pink-600', 'bg-indigo-600', 'bg-teal-600',
      'bg-orange-800', 'bg-cyan-600', 'bg-lime-600', 'bg-emerald-600',
      'bg-rose-600', 'bg-amber-600', 'bg-fuchsia-600', 'bg-violet-600'
    ];
    let index =0
    for(let i=0;i<name.length;i++){
      index=name.charCodeAt(i)
    }
    return colors[index% colors.length];
  }

  showDialog(id: string, position: string) {
    console.log(id);
    
    this.userService.userDetails(id).subscribe({
      next: (user) => {
        this.selectedUser = user; 
        console.log(this.selectedUser);
        
        this.position = this.isMobile ? 'bottom' : position;
        this.visible = true;
      },
      error: (error) => {
        console.error('Error showing user dialog:', error);
      }
    });
  }
  hideDialog() {
    this.visible = false;
  }
  saveData() {
    console.log('Saving user data:');
    this.visible = false;
  }
}
