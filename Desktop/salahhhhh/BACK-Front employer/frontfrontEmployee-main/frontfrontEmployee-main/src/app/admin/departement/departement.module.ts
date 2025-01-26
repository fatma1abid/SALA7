import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementRoutingModule } from './departement-routing.module';
import { DepartementListComponent } from './departement-list/departement-list.component';
import { DepartementDetailComponent } from './departement-detail/departement-detail.component';
import { DepartementAddComponent } from './departement-add/departement-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { FilterPipe } from 'src/filter.pipe';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DepartementListComponent,
    DepartementDetailComponent,
    DepartementAddComponent,
    
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
