import { Component } from '@angular/core';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { UserFooterComponent } from '../../../shared/user-footer/user-footer.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [UserNavComponent,UserFooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginFrom!:FormGroup
  
}
