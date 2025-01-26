import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsulterFoyerComponent } from './consulter-foyer/consulter-foyer.component';
import { ConsulterBlocComponent } from '../bloc/consulter-bloc/consulter-bloc.component';
import { DetailFoyerComponent } from '../bloc/detail-foyer/detail-foyer.component';
import { MixteFoyerComponent } from './mixte-foyer/mixte-foyer.component';
import { ParSexeFoyerComponent } from './par-sexe-foyer/par-sexe-foyer.component';


const routes: Routes = [
  {path:"ConsulterFoyer",component:ConsulterFoyerComponent},
  {path:"ConsulterDetail/:idFoyer",component:ConsulterBlocComponent},
  {path:"Detail/:idFoyer",component:DetailFoyerComponent},
  {path:"FoyerM",component:MixteFoyerComponent},
  {path:"FoyerS",component:ParSexeFoyerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoyerRoutingModule { }
