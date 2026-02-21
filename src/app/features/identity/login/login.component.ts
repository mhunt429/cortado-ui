import { Component, inject } from '@angular/core';
import { FloatingLabelComponent } from '../../../shared/components/inputs/floating-label/floating-label.component';
import { AuthService } from '../../../shared/services/auth.service';
import { Login } from '../../../core/models/identity/login';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertComponent, AlertType } from '../../../shared/components/alert/alert.component';
import { BaseApiResponse } from '../../../core/models/baseApiResponse';
import { AccessToken } from '../../../core/models/identity/accessToken';
import {
  LogIn,
  Mail,
  Lock,
  Sparkles,
  LUCIDE_ICONS,
  LucideIconProvider,
  LucideAngularModule,
} from 'lucide-angular';
import { CardComponent } from '../../../shared/components/card/card.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FloatingLabelComponent,
    ReactiveFormsModule,
    AlertComponent,
    RouterLink,
    LucideAngularModule,
    CardComponent,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        LogIn,
        Mail,
        Lock,
        Sparkles,
      }),
    },
  ],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  AlertType = AlertType;

  loginError = '';

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  handleLogin(event: Event) {
    event.preventDefault();

    const request: Login = {
      email: this.loginForm.get('email')?.value || '',
      password: this.loginForm.get('password')?.value || '',
      rememberMe: this.loginForm.get('rememberMe')?.value || false,
    };
    this.authService.loginUser$(request).subscribe({
      next: (loginRsp: BaseApiResponse<AccessToken>) => {
        const tokenData = loginRsp.data;
        sessionStorage.setItem('accessToken', tokenData.accessToken);
        sessionStorage.setItem('sessionExpiration', tokenData.accessTokenExpiration);
        this.router.navigateByUrl('/dashboard');
      },
      error: (e) => {
        console.error(e);
        if (e.status === 401) {
          this.loginError = 'Please check your login credentials and try again.';
        } else {
          this.loginError = `We're unable to sign you in at this moment. Please try again later.`;
        }
      },
    });
  }
}
