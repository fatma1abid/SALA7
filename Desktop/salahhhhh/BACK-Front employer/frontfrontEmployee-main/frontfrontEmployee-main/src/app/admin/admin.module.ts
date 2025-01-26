import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PageAccueilComponent } from './components/page-accueil/page-accueil.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BackgroundDirective } from './directives/background.directive';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterPipe } from 'src/filter.pipe';
import { FoyerModule } from './foyer/foyer.module';
import { BlocModule } from '../front/bloc/bloc.module';

import { ConfirmationComponent } from './components/confirmation/confirmation.component';
 

@NgModule({
  declarations: [
    PageAccueilComponent,
    ConfirmationDialogComponent,
    BackgroundDirective,
    ],
  imports: [
    SharedModule,
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FoyerModule,
    BlocModule
  ]
})
export class AdminModule { }
