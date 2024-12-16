package com.healthtime.healttimebackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthtime.healttimebackend.entities.Specialite;
import com.healthtime.healttimebackend.services.SpecialiteService;

import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping("/api/v0/specialites")
public class SpecialiteController {

    @Autowired
    private SpecialiteService specialiteService;
    @GetMapping("/{id}")
    public ResponseEntity<Specialite> getSpecialiteId(@PathVariable int id){
        return ResponseEntity.ok(specialiteService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Specialite>> getAllSpecialite(){
        List<Specialite> specialites =specialiteService.findAll();
        return ResponseEntity.ok(specialites);    
    }
    
    @PostMapping
    public ResponseEntity<Specialite> createSpecialite(@RequestBody Specialite specialite){
        return ResponseEntity.ok(specialiteService.create(specialite));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Specialite> updateSpecialite(@PathVariable int id,@RequestBody Specialite specialite){
        return ResponseEntity.ok(specialiteService.update(specialite));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Specialite> deleteSpecialite(@PathVariable int id){
        specialiteService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
}   
