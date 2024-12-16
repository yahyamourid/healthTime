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
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateConsultation;
    private String compteRendu;
    
    @OneToMany
    @JoinColumn(name = "consultation_id") 
    private List<Analyse> analyses=new ArrayList<>();

    @OneToMany
    @JoinColumn(name = "consultation_id") 
    private List <Ordonnance> ordonnances=new ArrayList<>();

    @ManyToOne
    @JsonIgnore
    private DossierMedical dossierMedical;
    
}
