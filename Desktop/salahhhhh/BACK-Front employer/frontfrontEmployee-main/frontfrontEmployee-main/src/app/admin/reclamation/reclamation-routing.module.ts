import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { FormulaireReclamationComponent } from './formulaire-reclamation/formulaire-reclamation.component';
import { ListeReclamationsComponent } from './liste-reclamations/liste-reclamations.component';

const routes: Routes = [
  {path:'listeRec' , component:ListeReclamationsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationRoutingModule { }
