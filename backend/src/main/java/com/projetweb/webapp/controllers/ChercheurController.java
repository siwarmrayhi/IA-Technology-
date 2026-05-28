package com.projetweb.webapp.controllers;

import com.projetweb.webapp.entities.Chercheur;
import com.projetweb.webapp.repositories.ChercheurRepository;
import com.projetweb.webapp.services.ChercheurService; // Import indispensable
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chercheurs")
@CrossOrigin(origins = "*")
public class ChercheurController {

    @Autowired
    private ChercheurRepository chercheurRepository;

    @Autowired
    private ChercheurService chercheurService; // C'ÉTAIT CETTE LIGNE QUI MANQUAIT !

    // 1. Récupérer tous les chercheurs
    @GetMapping
    public List<Chercheur> getAll() {
        return chercheurRepository.findAll();
    }

    // 2. Ajouter un chercheur
    @PostMapping
    public Chercheur save(@RequestBody Chercheur chercheur) {
        return chercheurRepository.save(chercheur);
    }

    // 3. Recherche par nom (Tâche 3.1.1)
    @GetMapping("/rechercher")
    public List<Chercheur> rechercher(@RequestParam String nom) {
        return chercheurService.rechercherParNom(nom);
    }

    // 4. Filtrer par domaine (Tâche 3.1.2)
    @GetMapping("/domaine/{domaineId}")
    public List<Chercheur> getByDomaine(@PathVariable Long domaineId) {
        return chercheurService.rechercherParDomaine(domaineId);
    }

    // 5. Modifier un chercheur
    @PutMapping("/{id}")
    public Chercheur update(@PathVariable Long id, @RequestBody Chercheur details) {
        Chercheur chercheur = chercheurRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Chercheur non trouvé"));
        
        chercheur.setNom(details.getNom());
        chercheur.setPrenom(details.getPrenom());
        chercheur.setEmail(details.getEmail());
        chercheur.setAffiliation(details.getAffiliation());
        chercheur.setDomaine(details.getDomaine());
        
        return chercheurRepository.save(chercheur);
    }

    // 6. Supprimer un chercheur
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        chercheurService.supprimer(id);
    }
}