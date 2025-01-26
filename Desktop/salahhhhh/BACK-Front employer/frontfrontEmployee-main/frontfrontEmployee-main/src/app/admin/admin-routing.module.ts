import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAccueilComponent } from './components/page-accueil/page-accueil.component';
import { ListEtudiantsComponent } from './user/list-etudiants/list-etudiants.component';
import { RoleGuard } from '../shared/guards/role.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UniversiteListComponent } from './universite/universite-list/universite-list.component';

const routes: Routes = [
  {path: 'accueil',component:PageAccueilComponent,canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' }},
  {path: 'etudiants', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' } },
  {path: 'reclamation', loadChildren: () => import('./reclamation/reclamation.module').then(m => m.ReclamationModule),canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' } },

  {path: 'categorie', loadChildren: () => import('./categorie/categorie.module').then(m => m.CategorieModule),canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' } },
  {path: 'livre', loadChildren: () => import('./livre/livre.module').then(m => m.LivreModule),canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' } },
  {path: 'empruntLivre', loadChildren: () => import('./emprunt-livre/emprunt-livre.module').then(m => m.EmpruntLivreModule),canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' } },
  { path: '', loadChildren: () => import('./universite/universite.module').then(m => m.UniversiteModule) ,canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' }},
  { path: '', loadChildren: () => import('./departement/departement.module').then(m => m.DepartementModule) ,canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' }},
  { path: 'foyer', loadChildren: () => import('./foyer/foyer.module').then(m => m.FoyerModule),canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' } },
  { path: 'bloc', loadChildren: () => import('./bloc/bloc.module').then(m => m.BlocModule),canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' } },
  {path:'chambre', loadChildren: () => import('./chambre/chambre.module').then(m => m.ChambreModule) ,canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' }},
  {path:'reservation', loadChildren: () => import('../front/reservation/reservation.module').then(m => m.ReservationModule),canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' } },

  {path: 'bibliotheque', loadChildren: () => import('./bibliotheque/bibliotheque.module').then(m => m.BibliothequeModule) ,canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' } },
  {path: 'evenement', loadChildren: () => import('./evenement/evenement.module').then(m => m.EvenementModule) ,canActivate: [AuthGuard,RoleGuard],
  data: {
  expectedRole: 'ADMIN' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
