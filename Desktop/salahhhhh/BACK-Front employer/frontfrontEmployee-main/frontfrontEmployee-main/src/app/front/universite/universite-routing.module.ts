import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversiteListComponent } from './universite-list/universite-list.component';
import { DepartementListComponent } from '../departement/departement-list/departement-list.component';

const routes: Routes = [
  {path:'afficher' , component:UniversiteListComponent},
  { path: 'departement/:nomUniversite', component: DepartementListComponent },



];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversiteRoutingModule { }
