package com.healthtime.healttimebackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.healthtime.healttimebackend.dto.DemandDTO;
import com.healthtime.healttimebackend.dto.ImageDTO;
import com.healthtime.healttimebackend.dto.SearchResult;
import com.healthtime.healttimebackend.dto.SoignantDTO;
import com.healthtime.healttimebackend.dto.SoignantDashboardDTO;
import com.healthtime.healttimebackend.entities.Soignant;
import com.healthtime.healttimebackend.services.SoignantService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v0/soignants")
public class SoignantController {

    @Autowired
    private SoignantService soignantService;

    @GetMapping("/{id}")
    public ResponseEntity<SoignantDTO> getSoignantId(@PathVariable int id) {
        return ResponseEntity.ok(soignantService.findByIdDTO(id));
    }

    @GetMapping
    public ResponseEntity<List<Soignant>> getAllSoignant() {
        List<Soignant> soignants = soignantService.findAll();
        return ResponseEntity.ok(soignants);
    }

    @PostMapping
    public ResponseEntity<Soignant> createSoignant(@RequestBody Soignant soignant) {
        return ResponseEntity.ok(soignantService.create(soignant));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Soignant> updateSoignant(@PathVariable int id, @RequestBody Soignant soignant) {
        return ResponseEntity.ok(soignantService.update(soignant));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Soignant> deleteSoignant(@PathVariable int id) {
        soignantService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<SearchResult> search(@RequestParam String prefix, @RequestParam int limit) {
        SearchResult results = soignantService.search(prefix, limit);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/soignantsBySpecialite/{specialiteId}/{villeId}")
    public ResponseEntity<List<SoignantDTO>> findSoignantsBySpecialiteId(@PathVariable int specialiteId, @PathVariable int villeId) {
        List<SoignantDTO> results = soignantService.findSoignantsBySpecialiteId(specialiteId, villeId);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/demands")
    public ResponseEntity<List<DemandDTO>> getAlldemands(){
        List<DemandDTO> demands = soignantService.getAllDemands();
        return ResponseEntity.ok(demands);
    }

    @GetMapping("/certificat/{id}")
    public ResponseEntity<ImageDTO> getcertificat(@PathVariable int id){
        return ResponseEntity.ok(soignantService.getcertificat(id));
    }

    @GetMapping("/dashboard/{id}")
    public SoignantDashboardDTO getSoignantDashboard(@PathVariable int id) {
        return soignantService.dashboardSoignant(id);
    }

}
