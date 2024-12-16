package com.healthtime.healttimebackend.entities;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
@DiscriminatorValue("SOIGANT")
public class Soignant extends User {
    private String telephone;
    private String adresse;
    private float tarif;
    private float latitude;
    private float longitude;

    private boolean accepted;
    private boolean rejected;
    private String presentation;
    

    private LocalTime dateDebut; // Start of working hours
    private LocalTime dateFin;   // End of working h
    private int dureeConsultation; // Consultation duration in minutes
    
    @ManyToOne
    private Ville ville;

    @Lob
    @Column(name = "certificat", columnDefinition = "LONGBLOB")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private byte[] certificat;

    @OneToMany
    @JoinColumn(name = "soignant_id")  
    @JsonIgnore
    private List<DossierMedical> dossierMedicals = new ArrayList<>();

    @OneToMany(mappedBy = "soignant")  
    @JsonIgnore
    private List<RendezVous> rendezVous = new ArrayList<>();

    @OneToMany
    @JoinColumn(name = "soignant_id") 
    @JsonIgnore
    private List<Message> messages = new ArrayList<>();

    @ManyToMany
    private List<Specialite> specialites;

    @OneToMany
    @JoinColumn(name = "soignant_id") 
    private List<Diplome> diplomes;

    @OneToMany
    @JoinColumn(name = "soignant_id")  
    private List<Experience> experiences;

    @ManyToMany(mappedBy = "soignants")
    private List<CenterMedical> centerMedicals;
}
