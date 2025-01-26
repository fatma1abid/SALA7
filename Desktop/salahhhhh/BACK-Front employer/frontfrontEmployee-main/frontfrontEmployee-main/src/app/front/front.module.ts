import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilFrontComponent } from './components/accueil-front/accueil-front.component';
import { SharedModule } from '../shared/shared.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../shared/interceptors/auth-interceptor.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ListCategorieComponent } from './components/list-categorie/list-categorie.component';
import { ListLivresComponent } from './components/list-livres/list-livres.component';
import { LivreDetailsComponent } from './components/livre-details/livre-details.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { DemandeEmpruntComponent } from './components/demande-emprunt/demande-emprunt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LivreComponent } from './components/livre/livre.component';
import { BlocModule } from './bloc/bloc.module';
import { ModifResComponent } from './reservation/components/modif-res/modif-res.component';

import { CalendrierComponent } from './components/calendrier/calendrier.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';  
import { FrontRoutingModule } from './front-routing.module';


@NgModule({
  declarations: [
    AccueilFrontComponent,

    ListCategorieComponent,
    ListLivresComponent,
    LivreDetailsComponent,
    DemandeEmpruntComponent,
    LivreComponent,
   
    CalendrierComponent,
  ],
  imports: [
    FrontRoutingModule,
    SharedModule,
    CommonModule,
    BlocModule,
    FullCalendarModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],

  
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
   

  ]
})
export class FrontModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }
