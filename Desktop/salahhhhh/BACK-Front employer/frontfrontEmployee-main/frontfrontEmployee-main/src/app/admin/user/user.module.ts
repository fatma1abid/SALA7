import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEtudiantsComponent } from './list-etudiants/list-etudiants.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListEtudiantsComponent, UserFormComponent,
    ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    
  ]
})
export class UserModule { }
