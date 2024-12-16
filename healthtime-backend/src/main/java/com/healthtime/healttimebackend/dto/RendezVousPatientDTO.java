package com.healthtime.healttimebackend.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RendezVousPatientDTO {
    private int id;
    private String nomSoignant;
    private String prenomSoignant;
    private String etat;
    private Boolean isCheckUp;
    private LocalDateTime dateRendez;  
    private String adresse;
    private String telephone;
}
