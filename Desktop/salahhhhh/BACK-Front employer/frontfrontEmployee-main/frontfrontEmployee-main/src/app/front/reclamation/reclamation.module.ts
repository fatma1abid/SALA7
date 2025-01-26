import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaireReclamationComponent } from './formulaire-reclamation/formulaire-reclamation.component';
import { MesReclamationsComponent } from './mes-reclamations/mes-reclamations.component';
import { ReclamationRoutingModule } from './reclamation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FormulaireReclamationComponent,
    MesReclamationsComponent,
  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReclamationRoutingModule,
    SharedModule
  ]
})
export class ReclamationModule { }
