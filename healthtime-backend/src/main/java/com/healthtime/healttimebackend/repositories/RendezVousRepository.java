package com.healthtime.healttimebackend.repositories;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.Patient;
import com.healthtime.healttimebackend.entities.RendezVous;
import com.healthtime.healttimebackend.entities.Soignant;

import java.util.List;


@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Integer> {
    boolean existsBySoignant_IdAndDateRendez(int soignantId, LocalDateTime dateHeure);
    List <RendezVous> findBySoignant(Soignant soignant);
    List<RendezVous> findByPatient(Patient patient);
}
