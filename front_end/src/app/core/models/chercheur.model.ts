import { Domaine } from './domaine.model';

export interface Chercheur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  affiliation: string;
  domaine?: Domaine;
}
