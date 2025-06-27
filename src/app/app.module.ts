import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TenantService } from './tenant/tenant.service';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { DomainNotFoundComponent } from './domain-not-found/domain-not-found.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    DomainNotFoundComponent,
    TopNavComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (tenantService: TenantService) => () => tenantService.loadTenant(),
      deps: [TenantService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
