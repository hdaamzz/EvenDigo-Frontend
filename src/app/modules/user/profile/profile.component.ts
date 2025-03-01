import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit, OnDestroy{
  @ViewChild('sidebarRef') sidebarRef!: ElementRef;
  
  isCollapsed = false;
  isMenuActive = false;
  
  navItems = [
    { icon: 'fa-user', label: 'Profile', path: '/profile/details', exact: true },
    { icon: 'fa-code-branch', label: 'My events', path: '/profile/events' },
    { icon: 'fa-wallet', label: 'Wallet', path: '/profile/wallet' }
  ];

  secondaryNavItems = [
    { icon: 'fa-home', label: 'Home', path: '/' },
    { icon: 'fa-sign-out-alt', label: 'Logout', path: '/logout' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (window.innerWidth >= 1024) {
      this.isMenuActive = false;
    } else {
      this.isCollapsed = false;
    }
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  // isActive(path: string): boolean {
  //   return this.router.isActive(path, path === '/profile' ? true : false);
  // }
}
