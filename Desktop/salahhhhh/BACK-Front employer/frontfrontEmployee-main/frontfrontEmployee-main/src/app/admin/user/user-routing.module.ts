import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/shared/guards/role.guard';
import { ListEtudiantsComponent } from './list-etudiants/list-etudiants.component';


const routes: Routes = [
  {path:'' , component:ListEtudiantsComponent}


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 

}
