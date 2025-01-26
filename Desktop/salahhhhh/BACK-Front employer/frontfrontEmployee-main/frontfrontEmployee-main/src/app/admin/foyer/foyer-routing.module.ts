import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFoyerComponent } from './add-foyer/add-foyer.component';
import { DeleteFoyerComponent } from './delete-foyer/delete-foyer.component';
import { ShowFoyerComponent } from './show-foyer/show-foyer.component';
import { UpdateFoyerComponent } from './update-foyer/update-foyer.component';
import { ShowBlocComponent } from '../bloc/show-bloc/show-bloc.component';
import { AffecterBlocComponent } from '../bloc/affecter-bloc/affecter-bloc.component';

const routes: Routes = [
  {path:"AddFoyer",component:AddFoyerComponent},
  {path:"UpdateFoyer/:idFoyer",component:UpdateFoyerComponent},
  {path:"ShowFoyer",component:ShowFoyerComponent},
  {path:"DeleteFoyer",component:DeleteFoyerComponent},
  {path:"consulter/:idFoyer",component:ShowBlocComponent},
  {path:"AffecterBloc/:nomFoyer",component:AffecterBlocComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoyerRoutingModule { }
