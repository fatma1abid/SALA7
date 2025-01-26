import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Departement } from 'src/app/models/Departement';
import { Universite } from 'src/app/models/universite';
import { DepartementService } from 'src/app/service/departement.service';
import { UniversiteService } from 'src/app/service/universite.service';

@Component({
  selector: 'app-departement-add',
  templateUrl: './departement-add.component.html',
  styleUrls: ['./departement-add.component.scss']
})
export class DepartementAddComponent {
  @Output() departementAjoute = new EventEmitter<Departement>();
  nouveauDepartement: Departement = new Departement();
  universites: Universite[] = [];
  selectedUniversiteId: number = 1;
  errorMessage: string = '';
  specialites = [
    { id: 1, nom: 'Finance d\'entreprise' },
    { id: 2, nom: 'Gestion des risques bancaires' },
    { id: 3, nom: 'Analyse financière et investissement' },
    { id: 4, nom: 'Banque d\'investissement' },
    { id: 5, nom: 'Gestion des portefeuilles' },
    { id: 6, nom: 'Crédit et financement' },
    { id: 7, nom: 'Audit bancaire' },
    { id: 8, nom: 'Marchés financiers et instruments financiers' },
    { id: 9, nom: 'Banque de détail' },
    { id: 10, nom: 'Monnaie et politique monétaire' },
    { id: 11, nom: 'Services bancaires numériques' },
    { id: 12, nom: 'Compliance et régulation bancaire' },
    { id: 13, nom: 'Banque privée et gestion de patrimoine' },
    { id: 14, nom: 'Banque et développement durable' },
    { id: 15, nom: 'E-banking et fintech' },
    { id: 16, nom: 'Gestion des relations clientèles en banque' },
    { id: 17, nom: 'Innovation et transformation digitale dans les banques' },
    { id: 18, nom: 'Gestion de crise financière en banque' },
    { id: 19, nom: 'Stratégie et gouvernance bancaire' },
    { id: 20, nom: 'Gestion de trésorerie et optimisation des liquidités' }
  ];


  constructor(
    private departementService: DepartementService,
    private universiteService: UniversiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.universiteService.findAllUniversites().subscribe((data: Universite[]) => {
      this.universites = data;
    });
  }

  ajouterDepartement() {
    // Vérifier que tous les champs sont remplis et valides
    if (
      this.nouveauDepartement.nomDepartement &&
      this.nouveauDepartement.responsable &&
      this.nouveauDepartement.specialite &&
      /^[A-Z]/.test(this.nouveauDepartement.nomDepartement) &&
      /^[A-Z]/.test(this.nouveauDepartement.responsable) &&
      /^[A-Z]/.test(this.nouveauDepartement.specialite.toString())
    ) {
      if (this.selectedUniversiteId) {
        // Ajouter le département
        this.departementService.addDepartement(this.nouveauDepartement).subscribe(
          (departement: Departement) => {
            console.log('Département ajouté avec succès:', departement);
            console.log('selectedUniversiteId:', this.selectedUniversiteId);

            this.universiteService.affecterDepartementAUniversite(departement.idDepartement, this.selectedUniversiteId).subscribe(
              () => {
                console.log('Département affecté à l\'université avec succès.');
                this.departementAjoute.emit(departement);
                // Réinitialiser le formulaire
                this.nouveauDepartement = new Departement();
                this.errorMessage = ''; // Clear any previous error message
              },
              (error) => {
                this.errorMessage = 'Erreur lors de l\'affectation du département à l\'université:' + error.message;
              }
            );
          },
          (error) => {
            this.errorMessage = 'Erreur lors de l\'ajout du département:' + error.message;
          }
        );
      } else {
        this.errorMessage = 'Veuillez sélectionner une université avant d\'ajouter le département.';
      }
      this.router.navigate(['/admin/departement/afficher']);
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs et commencer les champs appropriés par une lettre majuscule.';
    }
  }
}
