import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from './core/store/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private store: Store) {}
  ngOnInit() {
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const token = localStorage.getItem('token') || null;

    if (user && token) {
      this.store.dispatch(
        AuthActions.restoreSession({ user:parsedUser, token })
      );
    }
  }
}
