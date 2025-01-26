import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementRoutingModule } from './departement-routing.module';
import { DepartementListComponent } from './departement-list/departement-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DepartementListComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DepartementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DepartementModule { }
