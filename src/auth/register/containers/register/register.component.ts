import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'register',
  template: `
    <div>
      <auth-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a routerLink="/auth/login">Already have an account?</a>
        <button type="submit">
          Create account
        </button>
        <div *ngIf="error" class="error">
          {{ error }}
        </div>
      </auth-form>
    </div>
  `
})
export class RegisterComponent {

  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // async await to deal with promises
  async registerUser(event: FormGroup) {
    console.log(event.value);
    const { email, password } = event.value;
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      console.log(err);
      this.error = err.message;
    }
    // done
  }
}
