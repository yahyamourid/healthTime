package com.healthtime.healttimebackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthtime.healttimebackend.entities.Ville;
import com.healthtime.healttimebackend.services.VilleService;

@RestController
@RequestMapping("/api/v0/villes")
public class VilleController {
    @Autowired
    private VilleService villeService;

    @GetMapping("/{id}")
    public ResponseEntity<Ville> getVilleById(@PathVariable int id){
        return ResponseEntity.ok(villeService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Ville>> getAllVilles(){
        return ResponseEntity.ok(villeService.findAll());
    }

    @PostMapping
    public ResponseEntity<Ville> createVille(@RequestParam Ville vill){
        return ResponseEntity.ok(villeService.create(vill));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ville> updateVille(@RequestParam Ville ville){
        return ResponseEntity.ok(villeService.update(ville));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVille(@PathVariable int id){
        villeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
