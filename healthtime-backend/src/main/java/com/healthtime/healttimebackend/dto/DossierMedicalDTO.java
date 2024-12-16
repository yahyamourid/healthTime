package com.healthtime.healttimebackend.dto;


import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DossierMedicalDTO {
    private int id;
    private String nomPatient;
    private String prenomPatient;
    private int nbrConsultations;
    private LocalDateTime dateCreation;
    private String sexe;
    private String telephone;
}
