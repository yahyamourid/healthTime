package com.healthtime.healttimebackend.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.healthtime.healttimebackend.dto.RendezVousDTO;
import com.healthtime.healttimebackend.dto.RendezVousPatientDTO;
import com.healthtime.healttimebackend.entities.RendezVous;
import com.healthtime.healttimebackend.services.RendezVousService;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v0/rendezvous")
public class RendezVousController {

    @Autowired
    private RendezVousService rendezVousService;
    @GetMapping("/{id}")
    public ResponseEntity<RendezVous> getRendezVousId(@PathVariable int id){
        return ResponseEntity.ok(rendezVousService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<RendezVous>> getAllRendezVous(){
        List<RendezVous> rendezVouss =rendezVousService.findAll();
        return ResponseEntity.ok(rendezVouss);    
    }
    
    @PostMapping
    public ResponseEntity<RendezVous> createRendezVous(@RequestBody RendezVous rendezVous){
        return ResponseEntity.ok(rendezVousService.create(rendezVous));
    }
    @PutMapping("/{id}")
    public ResponseEntity<RendezVous> updateRendezVous(@PathVariable int id,@RequestBody RendezVous rendezVous){
        return ResponseEntity.ok(rendezVousService.update(rendezVous));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RendezVous> deleteRendezVous(@PathVariable int id){
        rendezVousService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/i/{medecinId}")
    public Map<String, Map<Integer, List<Integer>>> getDisponibilites(@PathVariable int medecinId) {
        return rendezVousService.getDisponibilites(medecinId);
    }

    @GetMapping("/soignant/{id}")
    public ResponseEntity<List<RendezVousDTO>> findbySoingnant(@PathVariable int id){
        List<RendezVousDTO> rendezVouss =rendezVousService.findbySoignant(id);
        return ResponseEntity.ok(rendezVouss); 
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<RendezVousPatientDTO>> findbyPatient(@PathVariable int id){
        List<RendezVousPatientDTO> rendezVouss =rendezVousService.findByPatient(id);
        return ResponseEntity.ok(rendezVouss); 
    }

    @PutMapping("/{id}/mark-as-done")
    public ResponseEntity<Void> markRendezVousAsDone(@PathVariable int id) {
            rendezVousService.markRendezVousAsDone(id);
            return ResponseEntity.noContent().build();
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<Void> cancelRendezVous(@PathVariable int id) {
            rendezVousService.cancelRendezVous(id);
            return ResponseEntity.noContent().build();
    }
      
}   
