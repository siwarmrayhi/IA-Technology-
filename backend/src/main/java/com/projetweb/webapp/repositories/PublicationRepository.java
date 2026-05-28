package com.projetweb.webapp.repositories;

import com.projetweb.webapp.entities.Publications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicationRepository extends JpaRepository<Publications, Long> {
}