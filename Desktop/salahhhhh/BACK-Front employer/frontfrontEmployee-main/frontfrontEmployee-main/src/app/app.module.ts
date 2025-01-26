import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientXsrfModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';  


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptorProviders } from './shared/interceptors';
import { AuthInterceptor } from './shared/interceptors/auth-interceptor.service';
import { FrontModule } from './front/front.module';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FrontModule,
    AdminModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN', // The name of the cookie that contains the CSRF token
      headerName: 'X-XSRF-TOKEN', // The name of the header that will contain the CSRF token
    }),
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    QRCodeModule,
    
   
    FullCalendarModule,

    RouterModule.forRoot([]),

   


  ],

  
  providers: [
    httpInterceptorProviders
],
    bootstrap: [AppComponent]
})
export class AppModule { }
