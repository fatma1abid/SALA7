import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chambre } from 'src/app/core/models/chambre.model';
import { ChambreService } from 'src/app/core/services/chambre.service';


@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.scss']
})
export class ModificationComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<ModificationComponent>,
    private chambreService:ChambreService,
    @Inject(MAT_DIALOG_DATA) public data: any){

  }

  modificationChambreForm !: FormGroup
  selectedFile!: File;
  msg !: String;
  error !: String;

  nameFile!:string

  chambre !: Chambre;

  onFileChanged(event: any): void {
    this.selectedFile =  event.target.files[0];
  }


  ngOnInit(): void {

    this.chambreService.getChambre(this.data.chambreId).subscribe(
      result=>{
        this.chambre = {
          idChambre: result.idChambre,
          numeroChambre: result.numeroChambre,
          typeChambre : result.typeChambre,
           
        }
      }
    );

    this.modificationChambreForm = this.formBuilder.group({
      idChambre: [null, [Validators.required , Validators.minLength(1)]],
      numeroChambre: [null, [Validators.required , Validators.minLength(1)]],
      typeChambre: [null, [Validators.required, Validators.minLength(1)]],
      
    })

  }
  get f() {
    return this.modificationChambreForm.controls;
  }


  modifierChambre(){
    this.chambreService.modifierChambre(this.modificationChambreForm.get('idChambre')?.value,this.modificationChambreForm.get('numeroChambre')?.value,this.modificationChambreForm.get('typeChambre')?.value).subscribe(
      ()=>{
        this.msg = "Chambre modifié avec succées"
          },
     ()=>{
        this.error = "Il ya une erreur qui est survenu"
     }
    )

  }


}
