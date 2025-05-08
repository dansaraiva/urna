package com.tech.UrnaEletronica.model;

import lombok.Data;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Data
@Entity
public class Chapa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String integrantes;

    @OneToMany(mappedBy = "chapa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Voto> votos;

    @Column(columnDefinition = "TEXT")
    private String fotoUrl;
}