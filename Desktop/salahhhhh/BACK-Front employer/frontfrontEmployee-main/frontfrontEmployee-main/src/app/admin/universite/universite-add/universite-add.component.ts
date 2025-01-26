import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/service/universite.service';

@Component({
  selector: 'app-universite-add',
  templateUrl: './universite-add.component.html',
  styleUrls: ['./universite-add.component.scss']
})
export class UniversiteAddComponent implements OnInit {
  universiteForm!: FormGroup;
  @Input() universiteParDefaut: Universite = new Universite();


  constructor(private universiteService: UniversiteService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.universiteForm = this.fb.group({
      nomUniversite: ['', [Validators.minLength(3) ,Validators.required, this.capitalizeValidator]],
      adresse: ['', [Validators.minLength(3) , Validators.required, this.capitalizeValidator]],
      etatUniversite: ['', [Validators.required, this.validateEtatSelection]]
    });
  }

  validateEtatSelection(control: any): {[key: string]: boolean} | null {
    const value = control.value;
    if (!value || value === "") {
      return { 'required': true };
    }
    return null;
  }


  capitalizeValidator(control: any): {[key: string]: boolean} | null {
    const value = control.value;
    if (value && value.charAt(0) !== value.charAt(0).toUpperCase()) {
      return { 'capitalize': true };
    }
    return null;
  }

  ajouterUniversite(): void {
    if (this.universiteForm.valid) {
      const nouvelleUniversite: Universite = this.universiteForm.value;

      this.universiteService.addUniversite(nouvelleUniversite).subscribe(
        (result) => {
          console.log('Banque ajoutée avec succès', result);
          this.router.navigate(['/admin/universite/afficher']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'banque', error);
        }
      );
    }
  }
}
