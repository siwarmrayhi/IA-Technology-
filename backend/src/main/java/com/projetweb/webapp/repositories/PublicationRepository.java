package com.projetweb.webapp.repositories;

import com.projetweb.webapp.entities.Publications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publications, Long> {
    List<Publications> findByEnAvantTrue();
}