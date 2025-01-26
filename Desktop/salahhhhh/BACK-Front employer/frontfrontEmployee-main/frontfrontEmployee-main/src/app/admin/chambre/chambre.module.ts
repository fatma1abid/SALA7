import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddChambreComponent } from './components/add-chambre/add-chambre.component';
import { ListChambreComponent } from './components/list-chambre/list-chambre.component';
import { ChambreRoutingModule } from './chambre-routingmodule';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModificationComponent } from './components/modification/modification.component';
 

@NgModule({
  declarations: [
    AddChambreComponent,
   ListChambreComponent,
   ModificationComponent,
   

  ],
  imports: [
    CommonModule,
    ChambreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
   
    

  ]
})
export class ChambreModule { }
