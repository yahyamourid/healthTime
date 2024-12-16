package com.healthtime.healttimebackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthtime.healttimebackend.entities.Ordonnance;
import com.healthtime.healttimebackend.services.OrdonnanceService;

@RestController
@RequestMapping("/api/v0/ordonnances")
public class OrdonnanceController {

    @Autowired
    private OrdonnanceService ordonnanceService;

    @GetMapping("/{id}")
    public ResponseEntity<Ordonnance> getOrdonnanceById(@PathVariable int id) {
        return ResponseEntity.ok(ordonnanceService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Ordonnance>> getAllOrdonnances() {
        return ResponseEntity.ok(ordonnanceService.findAll());
    }

    @PostMapping
    public ResponseEntity<Ordonnance> createOrdonnance(@RequestBody Ordonnance ordonnance) {
        return ResponseEntity.ok(ordonnanceService.create(ordonnance));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ordonnance> updateOrdonnance(@PathVariable int id, @RequestBody Ordonnance ordonnance) {
        ordonnance.setId(id);
        return ResponseEntity.ok(ordonnanceService.update(ordonnance));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrdonnance(@PathVariable int id) {
        ordonnanceService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{consultationId}")
    public ResponseEntity<Ordonnance> createOrdonnance(@PathVariable int consultationId, @RequestBody Ordonnance ordonnance) {
        Ordonnance createdOrdonnance = ordonnanceService.createOrdonnance(consultationId, ordonnance);
        return ResponseEntity.ok(createdOrdonnance);
    }
}
