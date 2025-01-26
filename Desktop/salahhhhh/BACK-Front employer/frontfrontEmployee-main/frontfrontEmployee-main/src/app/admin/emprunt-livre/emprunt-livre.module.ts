import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpruntLivreRoutingModule } from './emprunt-livre-routing.module';
import { ListEmpruntLivresComponent } from './components/list-emprunt-livres/list-emprunt-livres.component';
import { ModificationEmpruntLivreComponent } from './components/modification-emprunt-livre/modification-emprunt-livre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEmpruntLivreComponent } from './components/add-emprunt-livre/add-emprunt-livre.component';


@NgModule({
  declarations: [
    ListEmpruntLivresComponent,
    ModificationEmpruntLivreComponent,
    AddEmpruntLivreComponent
  ],
  imports: [
    CommonModule,
    EmpruntLivreRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmpruntLivreModule { }
