 
import { Component ,ElementRef,OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ReservationService } from 'src/app/core/services/reservation.service';
import { Reservation } from 'src/app/core/models/reservation.model';
import { DatePipe } from '@angular/common';
import { Chambre } from 'src/app/core/models/chambre.model';
import { TypeChambre } from 'src/app/core/models/TypeChambre.model';
import jsPDF from 'jspdf';
 
import * as QRCode from 'qrcode';
import { QRCodeModule } from 'angularx-qrcode';


@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit{
  reservationList: any;
  constructor  (   private formBuilder :  FormBuilder , private reservationService:ReservationService ){}



  /*nouvelleRes: Reservation = new Reservation();
  ch: Chambre[] = [];
  ChambreChosen: Chambre = new Chambre();
  anneeUniversitaire!: Date ;*/

  reservationForm !: FormGroup;
  selectedFile!: File;
  msg !: String;
  error !: String;

 anneeUniversitaire = new Date();
  
 typeChambre!:TypeChambre;
 
  
 
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      anneeUniversitaire: [null, [Validators.required , Validators.minLength(1)]],
     typeChambre: [null, [Validators.required , Validators.minLength(1)]],

    })  
    
  }


  get f() {
    return this.reservationForm.controls;
  }


  @ViewChild('content', { static: true })
  content!: ElementRef;

  AjouterReservation() {
    const anneeUniversitaire = this.reservationForm.get('anneeUniversitaire')?.value;
    const typeChambre = this.reservationForm.get('typeChambre')?.value;
 
   
  //  qrCodeImageUrl: string = '';

    this.reservationService.addReservation(
      anneeUniversitaire,
      typeChambre
    ).subscribe(
      () => {
        this.msg = "Reservation ajouté avec succès";
        this.reservationForm.reset();
        this.refreshReservationList();
        this.generatePDF(anneeUniversitaire, typeChambre);
      },
      () => {
        this.error = "Il y a une erreur qui est survenue";
      }
    );

    
  }




  
   /*
  generateQRCode(): void {
    this.reservationList.forEach((reservation: { idReservation: any; qrCodeImageUrl: string; }) => {
      this.qrCodeData = `Reservation ID: ${reservation.idReservation}`;

      QRCode.toDataURL(this.qrCodeData, (error, url) => {
        if (error) {
          console.error('Error generating QR code:', error);
          return;
        }
        // Set the QR code image URL for each reservation
        reservation.qrCodeImageUrl = url;
      });
    });}

  */
   
  private generatePDF(anneeUniversitaire: string, typeChambre: string) {
    let doc = new jsPDF();
     
    // Titre
    doc.setFontSize(18);
    doc.setTextColor(25, 25, 112); // Blue
    doc.text('Confirmation de Réservation', 20, 30);

    // Ligne séparatrice
    doc.setLineWidth(0.5);
    doc.setDrawColor(0); // Black
    doc.line(20, 35, 190, 35);

    // Contenu
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30); // Dark gray

    const message = "Votre réservation a été confirmée";
    doc.text(message, 20, 50);

 
 // Assuming you have 'anneeUniversitaire' and 'typeChambre' variables defined


const info = `Année Universitaire: ${anneeUniversitaire.toString()}\n Type de Chambre: ${typeChambre}`;
doc.text(info, 20, 70);
 


    // Sauvegarde du PDF
    doc.save('reservation.pdf');
  }

  private refreshReservationList() {
    this.reservationService.getAllReservation();
  }

  qrCodeData: string =  this.anneeUniversitaire.toString()  ; 
  

   





}




  
   
  