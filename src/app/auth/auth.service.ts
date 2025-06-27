import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
interface User{
  username:string,
  role:string,
  tenant:string
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string , tenant: string }) {
    return this.http.post<any>('http://localhost:3000/api/auth/login', data).pipe(
      map((res:any) => {
        localStorage.setItem('token', res.token);
        this.userSubject.next(res.user);
        console.log(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userSubject.next(payload);
    }
  }
}

