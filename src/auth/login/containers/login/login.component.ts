import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'login',
  template: `
    <div>
      <auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">
          Login
        </button>
        <div *ngIf="error" class="error">
          {{ error }}
        </div>
      </auth-form>
    </div>
  `
})
export class LoginComponent {

  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async loginUser(event: FormGroup) {
    console.log(event.value);
    const { email, password } = event.value;
    try {
      await this.authService.loginUser(email, password);
      // .then equivalent
      this.router.navigate(['/']);
    } catch (err) {
      console.log(err);
      this.error = err.message;
    }
    // done
  }
}
