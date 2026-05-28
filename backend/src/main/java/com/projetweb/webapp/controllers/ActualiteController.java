package com.projetweb.webapp.controllers;

import com.projetweb.webapp.entities.Actualite;
import com.projetweb.webapp.services.ActualiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/actualites")
@CrossOrigin(origins = "*")
public class ActualiteController {

    @Autowired
    private ActualiteService service;

    // GET public (utilisé par la page home et par le modérateur)
    @GetMapping
    public List<Actualite> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Actualite getById(@PathVariable Long id) { return service.getById(id); }

    // POST / PUT / DELETE : réservés au modérateur (à protéger via JWT/rôle
    // une fois la sécurité activée — pour l'instant tout est permitAll).
    @PostMapping
    public Actualite create(@RequestBody Actualite a) { return service.create(a); }

    @PutMapping("/{id}")
    public Actualite update(@PathVariable Long id, @RequestBody Actualite a) {
        return service.update(id, a);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}