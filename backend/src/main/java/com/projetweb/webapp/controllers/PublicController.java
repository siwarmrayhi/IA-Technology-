package com.projetweb.webapp.controllers;

import com.projetweb.webapp.entities.Chercheur;
import com.projetweb.webapp.services.ChercheurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/public") // URL différente pour l'espace utilisateur
@CrossOrigin(origins = "*")
public class PublicController {

    @Autowired
    private ChercheurService chercheurService;

    // --- 3.3.2 RECHERCHE ET CONSULTATION ---

    // 1. Recherche par nom
    @GetMapping("/recherche/nom")
    public List<Chercheur> rechercheParNom(@RequestParam String nom) {
        return chercheurService.rechercherParNom(nom);
    }

    // 2. Recherche par domaine (Classification)
    @GetMapping("/recherche/domaine/{id}")
    public List<Chercheur> rechercheParDomaine(@PathVariable Long id) {
        return chercheurService.rechercherParDomaine(id);
    }

    // 3. Recherche par mots-clés
    @GetMapping("/recherche/mots-cles")
    public List<Chercheur> rechercheParMotsCles(@RequestParam String mot) {
        // On réutilise une logique de recherche large
        return chercheurService.rechercherParMotsCles(mot);
    }
}