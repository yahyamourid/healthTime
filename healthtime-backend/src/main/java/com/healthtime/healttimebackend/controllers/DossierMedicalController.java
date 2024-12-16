package com.healthtime.healttimebackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthtime.healttimebackend.dto.DossierMedicalDTO;
import com.healthtime.healttimebackend.dto.DossierMedicalPatientDTO;
import com.healthtime.healttimebackend.entities.DossierMedical;
import com.healthtime.healttimebackend.services.DossierMedicalService;

@RestController
@RequestMapping("/api/v0/dossiers-medicaux")
public class DossierMedicalController {

    @Autowired
    private DossierMedicalService dossierMedicalService;

    @GetMapping("/{id}")
    public ResponseEntity<DossierMedical> getDossierMedicalById(@PathVariable int id) {
        return ResponseEntity.ok(dossierMedicalService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<DossierMedical>> getAllDossiersMedicaux() {
        return ResponseEntity.ok(dossierMedicalService.findAll());
    }

    @PostMapping
    public ResponseEntity<DossierMedical> createDossierMedical(@RequestBody DossierMedical dossierMedical) {
        return ResponseEntity.ok(dossierMedicalService.create(dossierMedical));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DossierMedical> updateDossierMedical(@PathVariable int id,
            @RequestBody DossierMedical dossierMedical) {
        dossierMedical.setId(id); // Assurez-vous que l'ID est bien défini
        return ResponseEntity.ok(dossierMedicalService.update(dossierMedical));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDossierMedical(@PathVariable int id) {
        dossierMedicalService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/create/{soignantId}/{patientId}")
    public ResponseEntity<DossierMedical> createDossierMedical(
            @PathVariable int soignantId,
            @PathVariable int patientId) {
        DossierMedical dossierMedical = dossierMedicalService.createDossierMedical(soignantId, patientId);
        return ResponseEntity.ok(dossierMedical);
    }

    @GetMapping("/soignant/{soignantId}")
    public ResponseEntity<List<DossierMedicalDTO>> getDossiersBySoignantId(@PathVariable int soignantId) {
        return ResponseEntity.ok(dossierMedicalService.getDossiersBySoignantId(soignantId));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<DossierMedicalPatientDTO>> getDossiersByPatientId(@PathVariable int patientId) {
        return ResponseEntity.ok(dossierMedicalService.getDossiersByPatientId(patientId));
    }

    // Dossier médical spécifique (par soignant et patient)
    @GetMapping("/soignant/{soignantId}/patient/{patientId}")
    public ResponseEntity<DossierMedical> getDossierBySoignantAndPatient(
            @PathVariable int soignantId,
            @PathVariable int patientId) {
        return ResponseEntity.ok(dossierMedicalService.getDossierBySoignantAndPatient(soignantId, patientId));
    }

    @GetMapping("/search/{soignantId}")
    public ResponseEntity<List<DossierMedical>> searchDossierMedical(
            @PathVariable int soignantId,
            @RequestParam String query) {
        List<DossierMedical> dossiers = dossierMedicalService.searchDossierMedical(soignantId, query);
        return ResponseEntity.ok(dossiers);
    }
}
