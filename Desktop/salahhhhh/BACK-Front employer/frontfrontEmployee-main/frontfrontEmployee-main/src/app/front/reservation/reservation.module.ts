import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import { ReservationRoutingModule } from  './reservation-routingmodule';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ModifResComponent } from './components/modif-res/modif-res.component';
import { ListReservationComponent } from './components/list-reservation/list-reservation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; 
import { ListChambreComponent } from '../../admin/chambre/components/list-chambre/list-chambre.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AddReservationComponent,
    
    ModifResComponent,
    ListReservationComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    MatDialogModule,
    MatButtonModule,
    QRCodeModule,
  ]
})
export class ReservationModule { }
