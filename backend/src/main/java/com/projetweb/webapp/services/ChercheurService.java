package com.projetweb.webapp.services;

import com.projetweb.webapp.entities.Chercheur;
import com.projetweb.webapp.repositories.ChercheurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChercheurService {

    @Autowired
    private ChercheurRepository chercheurRepository;

    // Lister tous les chercheurs
    public List<Chercheur> listerTous() {
        return chercheurRepository.findAll();
    }

    // Ajouter ou sauvegarder un chercheur
    public Chercheur ajouter(Chercheur c) {
        return chercheurRepository.save(c);
    }

    // Tâche 3.1.1 : Rechercher par nom (ignore la casse)
    public List<Chercheur> rechercherParNom(String nom) {
        return chercheurRepository.findByNomContainingIgnoreCase(nom);
    }

    // Tâche 3.1.2 : Rechercher par l'ID du domaine (Classification)
    public List<Chercheur> rechercherParDomaine(Long domaineId) {
        return chercheurRepository.findByDomaineId(domaineId);
    }

    // Supprimer un chercheur par son ID
    public void supprimer(Long id) {
        if (chercheurRepository.existsById(id)) {
            chercheurRepository.deleteById(id);
        } else {
            throw new RuntimeException("Impossible de supprimer : Chercheur introuvable avec l'ID " + id);
        }
    }

    // Tâche 3.3.2 : Recherche par mots-clés (Nom, Prénom ou Affiliation)
    public List<Chercheur> rechercherParMotsCles(String mot) {
        // Correction ici : on utilise les champs qui existent réellement dans ton entité
        return chercheurRepository.findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCaseOrAffiliationContainingIgnoreCase(mot, mot, mot);
    }
}