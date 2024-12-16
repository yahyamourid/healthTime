package com.healthtime.healttimebackend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DossierMedicalPatientDTO {
    private int id;
    private String nomSoignant;
    private String prenomSoignant;
    private int nbrConsultations;
    private LocalDateTime dateCreation;
    private String adresse;
    private String telephone;
}
