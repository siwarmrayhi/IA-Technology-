package com.projetweb.webapp.controllers;

import com.projetweb.webapp.entities.Publications;
import com.projetweb.webapp.services.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/publications")
@CrossOrigin("*")
public class PublicationController {

    @Autowired
    private PublicationService service;

    @GetMapping
    public List<Publications> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Publications getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Publications create(@RequestBody Publications p) {
        return service.save(p);
    }

    @PutMapping("/{id}")
    public Publications update(@PathVariable Long id, @RequestBody Publications p) {
        p.setId(id);
        return service.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            return ResponseEntity.ok(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    // GET : liste des publications mises en avant (pour la page d'accueil)
    @GetMapping("/featured")
    public List<Publications> getFeatured() {
        return service.getAll().stream()
                .filter(p -> Boolean.TRUE.equals(p.getEnAvant()))
                .toList();
    }

    // PATCH : activer/désactiver le marquage "en avant"
    @PatchMapping("/{id}/featured")
    public Publications setFeatured(@PathVariable Long id, @RequestParam boolean value) {
        Publications p = service.getById(id);
        if (p == null) return null;
        p.setEnAvant(value);
        return service.save(p);
    }
}