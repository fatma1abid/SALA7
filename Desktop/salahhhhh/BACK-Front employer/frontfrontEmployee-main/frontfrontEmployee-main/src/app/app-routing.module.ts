import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'front', loadChildren: () => import('./front/front.module').then(m => m.FrontModule) },
  { path: '', redirectTo: '/admin/accueil', pathMatch: 'full' },
    { path: 'admin/universite', loadChildren: () => import('./admin/universite/universite.module').then(m => m.UniversiteModule) },
    { path: 'admin/departement', loadChildren: () => import('./admin/departement/departement.module').then(m => m.DepartementModule) },
    { path: 'front/departement', loadChildren: () => import('./front/departement/departement.module').then(m => m.DepartementModule) },
    { path: 'front/universite', loadChildren: () => import('./front/universite/universite.module').then(m => m.UniversiteModule) },



  

  

  { path: '', redirectTo: '/admin/accueil', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
