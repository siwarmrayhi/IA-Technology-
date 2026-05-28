package com.projetweb.webapp.services;

import com.projetweb.webapp.entities.Actualite;
import com.projetweb.webapp.repositories.ActualiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActualiteService {

    @Autowired
    private ActualiteRepository repo;

    public List<Actualite> getAll() {
        return repo.findAllByOrderByDateDesc();
    }

    public Actualite getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Actualite create(Actualite a) {
        if (a.getDate() == null) a.setDate(LocalDateTime.now());
        return repo.save(a);
    }

    public Actualite update(Long id, Actualite a) {
        Actualite existing = repo.findById(id).orElse(null);
        if (existing == null) return null;
        existing.setTitre(a.getTitre());
        existing.setContenu(a.getContenu());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
