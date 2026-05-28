package com.projetweb.webapp.entities;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "domaines")
public class Domaine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;

    @OneToMany(mappedBy = "domaine")
    @JsonIgnore // Empêche les boucles infinies lors de l'affichage JSON
    private List<Chercheur> chercheurs;

    // Constructeur vide obligatoire
    public Domaine() {}

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<Chercheur> getChercheurs() { return chercheurs; }
    public void setChercheurs(List<Chercheur> chercheurs) { this.chercheurs = chercheurs; }
}