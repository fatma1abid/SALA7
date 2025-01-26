import { Component,Inject,  OnInit ,ElementRef,  ViewChild  } from '@angular/core';
import { Observable } from 'rxjs';
import { Chambre } from 'src/app/core/models/chambre.model';
import { ChambreService } from 'src/app/core/services/chambre.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModificationComponent } from '../modification/modification.component';
import { ConfirmationComponent } from 'src/app/admin/components/confirmation/confirmation.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  jsPDF  from 'jspdf';
import * as XLSX from 'xlsx';
 

@Component({
  selector: 'app-list-chambre',
  templateUrl: './list-chambre.component.html',
  styleUrls: ['./list-chambre.component.scss']
})
export class ListChambreComponent {
   
 constructor(
  private chambreService : ChambreService , private dialog:MatDialog
 ){}
 


  
 chambreList !: Observable<Chambre[]> 
 msg !: string;
 error!:string;
  
  chambre =  this.chambreService.getChambre(Chambre);
  
 ngOnInit(): void {
  this.chambreList =  this.chambreService.getAllChambre();
  
} 

openModalModification(id:any): void {
  const dialogRef = this.dialog.open(ModificationComponent, {
    width: '500px',
    height:'520px' ,
    data: { title:"Modification Chambre" , chambreId : id}
  });

}


openModalSuppression(id:any): void {
  const dialogRef = this.dialog.open(ConfirmationComponent, {
    width: '280px',
    height:'150px' ,
    data: {title:"Suppression Chambre" , content:"Voulez-vous vraiment supprimer cette chambre ?"}
  });




  dialogRef.afterClosed().subscribe(result => {
    if(result && result.confirmed){
    this.chambreService.supprimerChambre(id).subscribe(
      ()=>{
          this.msg = "Chambre supprimé avec succées"
          this.chambreService.getAllChambre();
      },
      ()=>{
        this.error = "Il ya une erreur qui est survenu"
      }
    )
  }}
  );
}






@ViewChild('content', { static: true })
  content!: ElementRef;

  public SavePDF(): void {
    let content = this.content.nativeElement;
    let doc = new jsPDF();

    // Define special elementHandlers to handle specific elements in your HTML
    let specialElementHandlers = {
      '#editor': function (element:any, renderer:any) {
        return true;
      }
    };

    // Add HTML content to the PDF using html method
    doc.html(content, {
      callback: function (pdf) {
        pdf.save('chambres.pdf');
      },   
      html2canvas: { scale: 0.2 }, // optional, adjust as needed 
      autoPaging: true,
      
      windowWidth: content.offsetWidth, // Set the width of the "window" (viewport)     
    });

  }

 

  fileName= 'ExcelChambres.xlsx';
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('content');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

























}





