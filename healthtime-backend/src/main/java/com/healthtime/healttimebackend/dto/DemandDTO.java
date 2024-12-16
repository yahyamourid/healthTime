package com.healthtime.healttimebackend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.healthtime.healttimebackend.entities.Specialite;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DemandDTO {
    private int id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String adresse;
    private float tarif;
    private LocalDateTime dateInscription;
    private List<Specialite> specialites;

}
