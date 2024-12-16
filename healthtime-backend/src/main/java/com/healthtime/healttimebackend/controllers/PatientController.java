package com.healthtime.healttimebackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthtime.healttimebackend.entities.Patient;
import com.healthtime.healttimebackend.services.PatientService;

import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping("/api/v0/patiens")
public class PatientController {

    @Autowired
    private PatientService patientService;
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientId(@PathVariable int id){
        return ResponseEntity.ok(patientService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatient(){
        List<Patient> patients =patientService.findAll();
        return ResponseEntity.ok(patients);    
    }
    
    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient){
        return ResponseEntity.ok(patientService.create(patient));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable int id,@RequestBody Patient patient){
        return ResponseEntity.ok(patientService.update(patient));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Patient> deletePatient(@PathVariable int id){
        patientService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
}   
