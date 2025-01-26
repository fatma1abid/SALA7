import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocRoutingModule } from './bloc-routing.module';
import { ConsulterBlocComponent } from './consulter-bloc/consulter-bloc.component';
import { FormsModule } from '@angular/forms';
import { DetailFoyerComponent } from './detail-foyer/detail-foyer.component';


@NgModule({
  declarations: [
    ConsulterBlocComponent,
    DetailFoyerComponent
  ],
  imports: [
    CommonModule,
    BlocRoutingModule,
    FormsModule
  ]
})
export class BlocModule { }
