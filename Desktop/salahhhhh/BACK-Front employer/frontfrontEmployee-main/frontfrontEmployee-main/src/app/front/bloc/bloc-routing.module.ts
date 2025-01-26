import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsulterBlocComponent } from './consulter-bloc/consulter-bloc.component';

const routes: Routes = [
  {path:"Consulter/:idFoyer",component:ConsulterBlocComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocRoutingModule { }
