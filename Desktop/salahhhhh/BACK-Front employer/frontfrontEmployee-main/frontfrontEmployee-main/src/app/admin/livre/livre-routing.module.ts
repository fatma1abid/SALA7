import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLivreComponent } from './components/add-livre/add-livre.component';
import { ListLivreComponent } from './components/list-livre/list-livre.component';

const routes: Routes = [
  {path:'add' , component:AddLivreComponent},
  {path:'list' , component:ListLivreComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivreRoutingModule { }
