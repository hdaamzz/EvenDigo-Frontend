import { Component } from '@angular/core';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { UserFooterComponent } from '../../../shared/user-footer/user-footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/user/auth.service';
import { Router, RouterModule } from '@angular/router';
import { emailValidator, passwordValidator, spacesValidator } from '../../../validators/formValidators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectLoading } from '../../../core/store/auth/auth.selectors';
import { AuthActions } from '../../../core/store/auth/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [UserNavComponent,UserFooterComponent,ReactiveFormsModule,CommonModule,RouterModule,AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginFrom!:FormGroup;
  showPassword = false;
  loading$: Observable<boolean>;
  constructor( 
    private fb:FormBuilder ,

    private store: Store
   ){
    this.initializeForms();
    this.loading$ = this.store.select(selectLoading);
   }

  
   private initializeForms(){
    this.loginFrom=this.fb.group({
      email:[
        '',
        [
          Validators.required,
          spacesValidator(),
          emailValidator(),
        ],
      ],
      password:[
        '',
        [
          Validators.required,
          passwordValidator()
        ]
      ]
    })
   }

  signIn(){
    if(!this.loginFrom.valid){
      this.loginFrom.markAllAsTouched();
      return ;
    }
    const formData = this.loginFrom.value;
    this.store.dispatch(AuthActions.login(formData));
  };



  hasError(controlName: string, errorName: string) {
    return this.loginFrom.controls[controlName].hasError(errorName);
  }
  hasFormError(errorName: string) {
    return this.loginFrom.hasError(errorName);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
}
