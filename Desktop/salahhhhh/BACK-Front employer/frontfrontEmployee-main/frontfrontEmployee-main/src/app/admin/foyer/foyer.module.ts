import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoyerRoutingModule } from './foyer-routing.module';
import { AddFoyerComponent } from './add-foyer/add-foyer.component';
import { DeleteFoyerComponent } from './delete-foyer/delete-foyer.component';
import { ShowFoyerComponent } from './show-foyer/show-foyer.component';
import { UpdateFoyerComponent } from './update-foyer/update-foyer.component';
import { FormsModule } from '@angular/forms';
import { AffecterBlocComponent } from '../bloc/affecter-bloc/affecter-bloc.component';


@NgModule({
  declarations: [
    AddFoyerComponent,
    DeleteFoyerComponent,
    ShowFoyerComponent,
    UpdateFoyerComponent,
    AffecterBlocComponent,
    
  ],
  imports: [
    CommonModule,
    FoyerRoutingModule,
    FormsModule
  ]
})
export class FoyerModule { }
