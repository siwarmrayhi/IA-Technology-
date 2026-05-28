package com.projetweb.webapp.services;

import com.projetweb.webapp.entities.Publications;
import com.projetweb.webapp.repositories.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicationService {

    @Autowired
    private PublicationRepository repository;

    public List<Publications> getAll() {
        return repository.findAll();
    }

    public Publications getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Publications save(Publications p) {
        return repository.save(p);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}