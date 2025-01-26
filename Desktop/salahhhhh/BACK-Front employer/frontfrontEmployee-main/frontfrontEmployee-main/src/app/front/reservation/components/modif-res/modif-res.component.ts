 
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from 'src/app/core/models/reservation.model';
import { ReservationService } from 'src/app/core/services/reservation.service';


@Component({
  selector: 'app-modif-res',
  templateUrl: './modif-res.component.html',
  styleUrls: ['./modif-res.component.scss']
})
export class ModifResComponent implements OnInit {
  constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<ModifResComponent>,
    private reservationService:ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: any){}

    modificationReservationForm !: FormGroup
    selectedFile!: File;
    msg !: String;
    error !: String;
  
    nameFile!:string
  
    reservation !: Reservation;
  
    onFileChanged(event: any): void {
      this.selectedFile =  event.target.files[0];
    }

    ngOnInit(): void {

      this.reservationService.getReservation(this.data.idReservation).subscribe(
        result=>{
          this.reservation = {
            idReservation: result.idReservation,
            anneeUniversitaire: result.anneeUniversitaire,
          
            
             
          }
        }
      );
  
      this.modificationReservationForm = this.formBuilder.group({
        idReservation: [null, [Validators.required , Validators.minLength(1)]],
        anneeUniversitaire: [null, [Validators.required , Validators.minLength(1)]],
      //  estValide: [null, [Validators.required, Validators.minLength(1)]],
        
      })
  
    }

    get f() {
      return this.modificationReservationForm.controls;
    }
  
  
    modifierReservation(){
      this.reservationService.modifierReservation(this.modificationReservationForm.get('idReservation')?.value,this.modificationReservationForm.get('anneeUniversitaire')?.value ).subscribe(
        ()=>{
          this.msg = "reservation modifié avec succées"
            },
       ()=>{
          this.error = "Il ya une erreur qui est survenu"
       }
      )
  
    }

















}
