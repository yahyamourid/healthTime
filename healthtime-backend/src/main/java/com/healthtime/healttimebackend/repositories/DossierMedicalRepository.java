package com.healthtime.healttimebackend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.DossierMedical;


@Repository
public interface DossierMedicalRepository extends JpaRepository<DossierMedical,Integer> {
    Optional<DossierMedical> findBySoignantIdAndPatientId(int soignantId, int patientId);

    List<DossierMedical> findBySoignantId(int soignantId);
    List<DossierMedical> findByPatientId(int patientId);
    List<DossierMedical> findBySoignantIdAndPatientNomContainingAndPatientPrenomContaining(int soignantId, String nom, String prenom);
}
