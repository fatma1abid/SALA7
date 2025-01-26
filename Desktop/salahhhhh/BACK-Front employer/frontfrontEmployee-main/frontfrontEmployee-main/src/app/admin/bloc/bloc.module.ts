import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocRoutingModule } from './bloc-routing.module';
import { AddBlocComponent } from './add-bloc/add-bloc.component';
import { UpdateBlocComponent } from './update-bloc/update-bloc.component';
import { ShowBlocComponent } from './show-bloc/show-bloc.component';
import { DeleteBlocComponent } from './delete-bloc/delete-bloc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZoomFoyerDirective } from './zoom-foyer.directive';

import { ColorbackgroundDirective } from './colorbackground.directive';



@NgModule({
  declarations: [
    AddBlocComponent,
    UpdateBlocComponent,
    ShowBlocComponent,
    DeleteBlocComponent,
    ZoomFoyerDirective,
    ColorbackgroundDirective,
 
  ],
  imports: [
    CommonModule,
    BlocRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   

    
  ],
  
})
export class BlocModule { }
