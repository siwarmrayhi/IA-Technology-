import { Chercheur } from './chercheur.model';

export interface Publication {
  id?: number;
  titre: string;
  description?: string;
  doi?: string;
  fichier?: string;
  datePublication?: string;
  chercheurs?: Chercheur[];
  enAvant?: boolean;  // <-- AJOUT
}
