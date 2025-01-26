import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { FormulaireReclamationComponent } from './formulaire-reclamation/formulaire-reclamation.component';
import { MesReclamationsComponent } from './mes-reclamations/mes-reclamations.component';

const routes: Routes = [
  {path:'mesRec' , component:MesReclamationsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationRoutingModule { }
