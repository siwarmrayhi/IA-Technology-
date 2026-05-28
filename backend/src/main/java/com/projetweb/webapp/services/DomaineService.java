package com.projetweb.webapp.services;

import com.projetweb.webapp.entities.Domaine;
import com.projetweb.webapp.repositories.DomaineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DomaineService {

    @Autowired
    private DomaineRepository domaineRepository;

    public List<Domaine> listerTous() {
        return domaineRepository.findAll();
    }

    public Domaine ajouter(Domaine d) {
        return domaineRepository.save(d);
    }
}