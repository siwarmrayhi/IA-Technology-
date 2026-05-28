package com.projetweb.webapp.services;

import com.projetweb.webapp.entities.Annonce;
import com.projetweb.webapp.repositories.AnnonceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnnonceService {

    @Autowired
    private AnnonceRepository repo;

    public List<Annonce> getAll() {
        return repo.findAllByOrderByDateDesc();
    }

    public Annonce getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Annonce create(Annonce a) {
        if (a.getDate() == null) a.setDate(LocalDateTime.now());
        return repo.save(a);
    }

    public Annonce update(Long id, Annonce a) {
        Annonce existing = repo.findById(id).orElse(null);
        if (existing == null) return null;
        existing.setTitre(a.getTitre());
        existing.setContenu(a.getContenu());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
