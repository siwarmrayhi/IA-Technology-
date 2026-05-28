package com.projetweb.webapp.repositories;

import com.projetweb.webapp.entities.Actualite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActualiteRepository extends JpaRepository<Actualite, Long> {
    List<Actualite> findAllByOrderByDateDesc();
}

