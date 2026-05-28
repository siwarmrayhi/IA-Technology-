package com.projetweb.webapp.repositories;

import com.projetweb.webapp.entities.Chercheur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChercheurRepository extends JpaRepository<Chercheur, Long> {

    // Pour 3.1.1 (Recherche simple par nom)
    List<Chercheur> findByNomContainingIgnoreCase(String nom);

    // Pour 3.1.2 (Classification par domaine)
    List<Chercheur> findByDomaineId(Long domaineId);

    // Pour 3.3.2 (Mots-clés : Nom, Prénom ou Affiliation)
    List<Chercheur> findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCaseOrAffiliationContainingIgnoreCase(String n, String p, String a);
}