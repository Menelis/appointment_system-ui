import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withFetch,
  withInterceptors, withXsrfConfiguration
} from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import { HomeComponent } from './home/home.component';
import {httpInterceptor} from './core/intercepters/http.interceptor';
import { CallbackComponent } from './callback/callback.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot()
  ],
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      }),
      withFetch(),
      withInterceptors([httpInterceptor])
      )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
