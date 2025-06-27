import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { TenantService } from '../tenant/tenant.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private tenant = window.location.hostname.split('.')[0];
  private featuresSubject = new BehaviorSubject<any[]>([]);
  public features$ = this.featuresSubject.asObservable();

  constructor(private socket: Socket,private router:Router, private http:HttpClient , private tenantService:TenantService) {
    this.socket.emit('join-tenant', 'tenant');

    // Initial fetch
    this.http.get('http://localhost:3000/api/features',{headers:new HttpHeaders(  {"Authorization":"Bearer "+localStorage.getItem('token')})})
    .subscribe({next:(flags: any) => {
          this.featuresSubject.next(flags.features);
        },
        error:(err)=>{
          this.router.navigate(['/login']);
        }
      });

    // Realtime update
    this.socket.fromEvent('features-update').subscribe((data: any) => {
      console.log(data);
      var features = data[tenantService.subDomain].features;
      this.featuresSubject.next(features);
    });
  }
}
