import { Component, EventEmitter, Output } from '@angular/core';
import { TenantService } from 'src/app/tenant/tenant.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
@Output() logout = new EventEmitter<void>();
  logo:String = '';
  constructor(private tenant:TenantService){
    this.logo = tenant.theme.logo;
  }
  onLogout() {
    this.logout.emit();
  }
}
