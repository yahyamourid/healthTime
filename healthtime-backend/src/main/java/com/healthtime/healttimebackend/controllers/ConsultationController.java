package com.healthtime.healttimebackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthtime.healttimebackend.entities.Consultation;
import com.healthtime.healttimebackend.services.ConsultationService;

@RestController
@RequestMapping("/api/v0/consultations")
public class ConsultationController {

    @Autowired
    private ConsultationService consultationService;

    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultationById(@PathVariable int id) {
        return ResponseEntity.ok(consultationService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Consultation>> getAllConsultations() {
        return ResponseEntity.ok(consultationService.findAll());
    }

    @PostMapping
    public ResponseEntity<Consultation> createConsultation(@RequestBody Consultation consultation) {
        return ResponseEntity.ok(consultationService.create(consultation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Consultation> updateConsultation(@PathVariable int id, @RequestBody Consultation consultation) {
        consultation.setId(id);
        return ResponseEntity.ok(consultationService.update(consultation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable int id) {
        consultationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{dossierMedicalId}")
    public ResponseEntity<Consultation> createConsultation(@PathVariable int dossierMedicalId, @RequestBody Consultation consultation) {
        Consultation createdConsultation = consultationService.createConsultation(dossierMedicalId, consultation);
        return ResponseEntity.ok(createdConsultation);
    }
}
