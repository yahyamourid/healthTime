package com.healthtime.healttimebackend.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class DossierMedical {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateCreation;

    @ManyToOne
    @JsonIgnore
    private Soignant soignant;

    @ManyToOne
    @JsonIgnore
    private Patient patient;

    @OneToMany
    @JoinColumn(name = "dossier_Medical_id") 
    private List<Consultation> consultations=new ArrayList<>();

    @OneToMany
    @JoinColumn(name = "dossier_Medical_id") 
    private List<Allergie> allergies=new ArrayList<>(); 

    @OneToMany
    @JoinColumn(name = "dossier_Medical_id") 
    private List<AntecedentMedical> antecedentMedicals=new ArrayList<>(); 

    @OneToMany
    @JoinColumn(name = "dossier_Medical_id") 
    private List<AntecedentChirurgical> antecedentChirurgicals=new ArrayList<>();  
}
