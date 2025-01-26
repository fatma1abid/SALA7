import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivreRoutingModule } from './livre-routing.module';
import { AddLivreComponent } from './components/add-livre/add-livre.component';
import { ListLivreComponent } from './components/list-livre/list-livre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListEmpruntLivresComponent } from '../emprunt-livre/components/list-emprunt-livres/list-emprunt-livres.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModificationDialogLivreComponent } from './components/modification-dialog-livre/modification-dialog-livre.component';


@NgModule({
  declarations: [
    AddLivreComponent,
    ListLivreComponent,
    ModificationDialogLivreComponent
  ],
  imports: [
    CommonModule,
    LivreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class LivreModule { }
