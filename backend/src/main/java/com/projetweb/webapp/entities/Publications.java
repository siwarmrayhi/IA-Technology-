package com.projetweb.webapp.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="PUBLICATIONS")
public class Publications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean enAvant = false;
    private String titre;
    private String description;
    private String doi; // lien DOI optionnel

    private String fichier; // nom du fichier PDF

    private LocalDate datePublication;

    @ManyToMany
    @JoinTable(
            name = "chercheur_publication",
            joinColumns = @JoinColumn(name = "publication_id"),
            inverseJoinColumns = @JoinColumn(name = "chercheur_id")
    )
    private List<Chercheur> chercheurs;

    public Long getId() {
        return id;
    }

    public String getTitre() {
        return titre;
    }

    public String getDescription() {
        return description;
    }

    public String getDoi() {
        return doi;
    }

    public String getFichier() {
        return fichier;
    }

    public LocalDate getDatePublication() {
        return datePublication;
    }

    public List<Chercheur> getChercheurs() {
        return chercheurs;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDoi(String doi) {
        this.doi = doi;
    }

    public void setFichier(String fichier) {
        this.fichier = fichier;
    }

    public void setDatePublication(LocalDate datePublication) {
        this.datePublication = datePublication;
    }

    public void setChercheurs(List<Chercheur> chercheurs) {
        this.chercheurs = chercheurs;
    }
    public Boolean getEnAvant() {
        return enAvant != null && enAvant;
    }

    public void setEnAvant(Boolean enAvant) {
        this.enAvant = enAvant;
    }

}
