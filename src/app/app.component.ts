import { Component } from '@angular/core';
import { TenantService } from './tenant/tenant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uxmint-design-frontend';
  constructor(
    private tenantService: TenantService,
    private router: Router
  ) {
    if (!tenantService.isValidTenant) {
      this.router.navigate(['/invalid-domain']);
    }else{
      this.router.navigate(['/dashboard']);
    }
  }
}
