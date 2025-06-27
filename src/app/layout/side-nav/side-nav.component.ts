import { Component, EventEmitter, Output } from '@angular/core';
import { TenantService } from 'src/app/tenant/tenant.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
@Output() logout = new EventEmitter<void>();
logo:String = '';
  constructor(private tenant:TenantService){
    this.logo = tenant.theme.logo;
  }
  onLogout() {
    this.logout.emit();
  }
}
