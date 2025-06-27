import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private config!: any;
  private tenant = window.location.hostname.split('.')[0];
public isValidTenant = true;
public validTenants = ['tenant1', 'tenant2'];
  constructor(private http: HttpClient , private router:Router) {
    this.isValidTenant = this.validTenants.includes(this.tenant);
  }

  loadTenant(): Promise<void> {
    return this.http.get<any[]>('/assets/tenant-configs.json')
      .toPromise()
      .then((configs:any) => {
        const tenantConfig = configs.find((c:any) => c.subdomain === this.tenant);
        if (!tenantConfig) this.router.navigate(['/invalid-domain']);
        this.config = tenantConfig;
      });
  }

  get theme() {
    return this.config.theme;
  }

  get layout() {
    return this.config.layout;
  }

  get subDomain() {
    return this.config.subdomain
  }
}
