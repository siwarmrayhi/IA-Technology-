package com.projetweb.webapp.controllers;

import com.projetweb.webapp.entities.Domaine;
import com.projetweb.webapp.repositories.DomaineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/domaines")
@CrossOrigin(origins = "*") // Autorise Angular à communiquer avec ton Backend
public class DomaineController {

    @Autowired
    private DomaineRepository domaineRepository;

    // 1. Lister tous les domaines
    @GetMapping
    public List<Domaine> getAll() {
        return domaineRepository.findAll();
    }

    // 2. Créer un nouveau domaine
    @PostMapping
    public Domaine save(@RequestBody Domaine domaine) {
        return domaineRepository.save(domaine);
    }

    // 3. MODIFIER un domaine (Tâche 3.1.2)
    @PutMapping("/{id}")
    public Domaine update(@PathVariable Long id, @RequestBody Domaine details) {
        Domaine domaine = domaineRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Domaine non trouvé avec l'id : " + id));
        
        domaine.setNom(details.getNom());
        domaine.setDescription(details.getDescription());
        
        return domaineRepository.save(domaine);
    }

    // 4. SUPPRIMER un domaine
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (domaineRepository.existsById(id)) {
            domaineRepository.deleteById(id);
        } else {
            throw new RuntimeException("Impossible de supprimer : Domaine inexistant");
        }
    }
}