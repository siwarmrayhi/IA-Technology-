package com.projetweb.webapp.repositories;

import com.projetweb.webapp.entities.Annonce;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnnonceRepository extends JpaRepository<Annonce, Long> {
    List<Annonce> findAllByOrderByDateDesc();
}
