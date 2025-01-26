import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlocComponent } from './add-bloc/add-bloc.component';
import { DeleteBlocComponent } from './delete-bloc/delete-bloc.component';
import { ShowBlocComponent } from './show-bloc/show-bloc.component';
import { UpdateBlocComponent } from './update-bloc/update-bloc.component';
import { AffecterBlocComponent } from './affecter-bloc/affecter-bloc.component';

const routes: Routes = [
  {path:"AddBloc",component:AddBlocComponent},
  {path:"UpdateBloc/:idBloc",component:UpdateBlocComponent},
  {path:"DeleteBloc",component:DeleteBlocComponent},
  {path:"ShowBloc/:idFoyer",component:ShowBlocComponent},
  {path:"AffecterBloc/:idFoyer",component:AffecterBlocComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocRoutingModule { }
