import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoyerRoutingModule } from './foyer-routing.module';
import { ConsulterFoyerComponent } from './consulter-foyer/consulter-foyer.component';
import { FormsModule } from '@angular/forms';
import { DetailFoyerComponent } from '../bloc/detail-foyer/detail-foyer.component';
import { MixteFoyerComponent } from './mixte-foyer/mixte-foyer.component';
import { ParSexeFoyerComponent } from './par-sexe-foyer/par-sexe-foyer.component';
import { ListFOYERComponent } from './list-foyer/list-foyer.component';



@NgModule({
  declarations: [

    ConsulterFoyerComponent,
     MixteFoyerComponent,
     ParSexeFoyerComponent,
     ListFOYERComponent,
   
  ],
  imports: [
    CommonModule,
    FoyerRoutingModule,
    FormsModule,
  ]
})
export class FoyerModule { }
