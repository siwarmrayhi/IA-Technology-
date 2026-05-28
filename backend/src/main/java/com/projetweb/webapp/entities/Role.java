package com.projetweb.webapp.entities;


import jakarta.persistence.*;

@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // ADMIN, MODERATOR, USER

    public Role() {}

    public Role(String name) {
        this.name = name;
    }

    // getters & setters
    public Long getId() { return id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }
}