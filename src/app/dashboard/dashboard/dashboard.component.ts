import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureService } from 'src/app/feature-services/feature.service';
import { TenantService } from 'src/app/tenant/tenant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  layoutType: 'top' | 'side';
  features = [
    { name: 'Feature A', flag: false },
    { name: 'Feature B', flag: false },
  ];

  constructor(private http: HttpClient ,private router:Router, private featureService:FeatureService , private tenant:TenantService) {
    this.layoutType = this.tenant.layout;
  }

  ngOnInit() {
    this.featureService.features$.subscribe(data => {
      this.features = data;
    });
    this.http.get('http://localhost:3000/api/features',{headers:new HttpHeaders(  {"Authorization":"Bearer "+localStorage.getItem('token')})})
    .subscribe({next:(flags: any) => {
          this.features = flags.features;
        },
        error:(err)=>{
          this.router.navigate(['/login']);
        }
      });
  }

  handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  this.router.navigate(['/login']);
}
}
