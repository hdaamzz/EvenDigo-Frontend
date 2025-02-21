import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { selectUser, selectIsAuthenticated } from '../../core/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AuthState, User } from '../../core/models/userModel';
import { AuthActions } from '../../core/store/auth/auth.actions';
import { Router } from '@angular/router';
interface AppState {
  auth: AuthState;
}


@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})

export class UserNavComponent implements OnInit, OnDestroy {
  user$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  private destroy$ = new Subject<void>();
  
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.user$ = this.store.select(selectUser);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit(): void {
    // Debug subscriptions
    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => console.log('User state updated:', user),
        error: (error) => console.error('Error in user$ subscription:', error)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.isMobileMenuOpen = false;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isMobileMenuOpen = false;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    const dropdown = document.getElementById('userDropdown');
    if (dropdown && !dropdown.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  get userInitial(): Observable<string> {
    return this.user$.pipe(
      map(user => user?.email?.charAt(0).toUpperCase() || 'U')
    );
  }
}