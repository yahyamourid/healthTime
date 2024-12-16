package com.healthtime.healttimebackend.dto;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RendezVousDTO {
  
    private int id;
    private String etat;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateRendez; 
    private String patientNom ;
    private String patientPrenom ;
    private String patientTel;
    private String patientAdresse;
    private String patientDateNaissance;
    private String patientSexe;
    private String patientEmail;
    private boolean isCheckUp ;
    private int patientId;
}
