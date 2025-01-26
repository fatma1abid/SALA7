import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartementListComponent } from './departement-list/departement-list.component';
import { DepartementAddComponent } from './departement-add/departement-add.component';
import { DepartementDetailComponent } from './departement-detail/departement-detail.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'afficher', component: DepartementListComponent },
  { path: 'add', component: DepartementAddComponent },
  { path: 'update/:idDepartement', component: DepartementDetailComponent },

];
@NgModule({
  imports: [FormsModule , RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartementRoutingModule { }
