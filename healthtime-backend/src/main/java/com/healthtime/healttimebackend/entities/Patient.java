package com.healthtime.healttimebackend.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue("PATIENT")

public class Patient extends User{
    private String telephone;
    private String dateNaissance;
    private String adresse;
    private String sexe;
    @OneToMany
    @JoinColumn(name = "patient_id") 
    @JsonIgnore
    private List<Document> documents=new ArrayList<>();
    @OneToMany
    @JoinColumn(name = "patient_id") 
    @JsonIgnore
    private List<DossierMedical> dossierMedicals =new ArrayList<>();
    
    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "patient_id") 
    private  List<RendezVous> rendezVous =new ArrayList<>();
    @OneToMany
    @JoinColumn(name = "patient_id") 
    @JsonIgnore
    private List<Message> messages =new ArrayList<>();
    

    
}
