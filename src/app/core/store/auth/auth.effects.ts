import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { Router ,NavigationStart} from '@angular/router';
import { AuthActions } from "./auth.actions";
import { AuthService } from "../../services/user/auth.service";
import { routerNavigatedAction, routerNavigationAction } from '@ngrx/router-store';

import Notiflix from "notiflix";




@Injectable({ 
    providedIn: 'root' 
})
export class AuthEffects {
    private authService:AuthService= inject(AuthService);
    private actions$:Actions=inject(Actions);
    private router: Router = inject(Router);


    checkAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(routerNavigatedAction),
            filter(() => {
                const currentUrl = this.router.url;
                return !currentUrl.includes('/login') && !currentUrl.includes('/register');
            }),
            switchMap(() => 
                this.authService.checkAuthStatus().pipe(
                    map(response => {
                        if (response.isAuthenticated && response.user) {
                            return AuthActions.restoreSession({
                                user: response.user,
                                token: ""
                            });
                        }
                        return AuthActions.loginFailure({ error: 'No session found' });
                    }),
                    catchError((error) => {
                        return of(AuthActions.loginFailure({ 
                            error: error.message || 'Failed to check auth status' 
                        }));
                    })
                )
            )
        )
    );
    
    handleAuthFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginFailure),
                tap(({ error }) => {
                    const currentUrl = this.router.url;
                    if (!currentUrl.includes('/login') && 
                        !currentUrl.includes('/register')) {
                        this.router.navigate(['/']);
                    }
                })
            ),
        { dispatch: false }
    );



    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(({ email, password }) =>
                this.authService.userLogin({ email, password }).pipe(
                    map(response => {
                        if (response.success) {
                            Notiflix.Notify.success('Welcome to EvenDigo');
                            return AuthActions.loginSuccess({
                                user: response.user,
                                token: response.token
                            });
                        }
                        throw new Error(response.message || 'Login Failed');
                    }),
                    catchError(error => {
                        const errorMessage = error.error?.message || error.message || 'Failed to Login';
                        Notiflix.Notify.failure(errorMessage);
                        return of(AuthActions.loginFailure({
                            error: errorMessage
                        }));
                    })
                )
            )
        )
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(() => {
                    this.router.navigate(['/']);
                })
            ),
        { dispatch: false }
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                switchMap(() => 
                    this.authService.logout().pipe(
                        map(() => {
                            this.router.navigate(['/login']);
                            return AuthActions.logoutSuccess();
                        }),
                        catchError(error => {
                            Notiflix.Notify.failure('Logout failed');
                            return of(AuthActions.logoutFailure({ error: error.message }));
                        })
                    )
                )
            )
    );

}