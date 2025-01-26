import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {
  private readonly FAVORIS_KEY = 'favoris';

  constructor() { }

  getFavoris(): number[] {
    const favorisString = localStorage.getItem(this.FAVORIS_KEY);
    return favorisString ? JSON.parse(favorisString) : [];
  }

  ajouterFavori(universite: any): void {
    const favoris = this.getFavoris();
    if (!this.estFavori(universite)) {
      favoris.push(universite.idUniversite);
      this.sauvegarderFavoris(favoris);
    }
  }

  supprimerFavori(universite: any): void {
    const favoris = this.getFavoris().filter((id) => id !== universite.idUniversite);
    this.sauvegarderFavoris(favoris);
  }

  estFavori(universite: any): boolean {
    return this.getFavoris().includes(universite.idUniversite);
  }

  private sauvegarderFavoris(favoris: number[]): void {
    localStorage.setItem(this.FAVORIS_KEY, JSON.stringify(favoris));
  }
}
