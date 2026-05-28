package com.projetweb.webapp.controllers;

import com.projetweb.webapp.entities.Annonce;
import com.projetweb.webapp.services.AnnonceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/annonces")
@CrossOrigin(origins = "*")
public class AnnonceController {

    @Autowired
    private AnnonceService service;

    @GetMapping
    public List<Annonce> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Annonce getById(@PathVariable Long id) { return service.getById(id); }

    @PostMapping
    public Annonce create(@RequestBody Annonce a) { return service.create(a); }

    @PutMapping("/{id}")
    public Annonce update(@PathVariable Long id, @RequestBody Annonce a) {
        return service.update(id, a);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
