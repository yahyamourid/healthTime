package com.healthtime.healttimebackend.dto;

import java.util.List;

import com.healthtime.healttimebackend.entities.Diplome;
import com.healthtime.healttimebackend.entities.Experience;
import com.healthtime.healttimebackend.entities.Specialite;
import com.healthtime.healttimebackend.entities.Ville;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SoignantDTO {
    private int id;
    private String nom;
    private String prenom;
    private String adresse;
    private String nomVille;
    private float tarif;
    private float latitude;
    private float longitude;
    private int dureeConsultation;
    private Ville ville;
    private List<Specialite> specialites;
    private List<Diplome> diplomes;
    private List<Experience> experiences;
    private String presentation;
    private String email;
    private String telephone;

    public SoignantDTO(int id, String nom, String prenom, String adresse, String nomVille) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.nomVille = nomVille;
    }
}
