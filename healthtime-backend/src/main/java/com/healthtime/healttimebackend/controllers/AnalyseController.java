package com.healthtime.healttimebackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthtime.healttimebackend.entities.Analyse;
import com.healthtime.healttimebackend.services.AnalyseService;

@RestController
@RequestMapping("/api/v0/analyses")
public class AnalyseController {

    @Autowired
    private AnalyseService analyseService;

    @GetMapping("/{id}")
    public ResponseEntity<Analyse> getAnalyseById(@PathVariable int id) {
        return ResponseEntity.ok(analyseService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Analyse>> getAllAnalyses() {
        return ResponseEntity.ok(analyseService.findAll());
    }

    @PostMapping
    public ResponseEntity<Analyse> createAnalyse(@RequestBody Analyse analyse) {
        return ResponseEntity.ok(analyseService.create(analyse));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Analyse> updateAnalyse(@PathVariable int id, @RequestBody Analyse analyse) {
        analyse.setId(id);
        return ResponseEntity.ok(analyseService.update(analyse));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnalyse(@PathVariable int id) {
        analyseService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{consultationId}")
    public ResponseEntity<Analyse> createAnalyse(@PathVariable int consultationId, @RequestBody Analyse analyse) {
        Analyse createdAnalyse = analyseService.createAnalyse(consultationId, analyse);
        return ResponseEntity.ok(createdAnalyse);
    }
}
