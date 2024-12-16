package com.healthtime.healttimebackend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SoignantDashboardDTO {
    private int soignantId;
    private String nomSoignant;
    private long nombreConsultations;
    private long nombrePatients; 
    private long nombreRendezVous;
    private long rendezVousEnCours;
    private long rendezVousFait;   
    private long rendezVousAnnule; 
    private long hommes;  
    private long femmes;  
    private double proportionHommes;
    private double proportionFemmes;
}
