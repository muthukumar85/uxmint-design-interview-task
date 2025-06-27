import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TenantService } from 'src/app/tenant/tenant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private ten:TenantService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      tenant:[ten.subDomain]
    });
  }

  submit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: err => {
        this.error = err.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}
