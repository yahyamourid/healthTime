package com.healthtime.healttimebackend.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthtime.healttimebackend.dao.IDao;
import com.healthtime.healttimebackend.dto.DossierMedicalDTO;
import com.healthtime.healttimebackend.dto.DossierMedicalPatientDTO;
import com.healthtime.healttimebackend.entities.DossierMedical;
import com.healthtime.healttimebackend.entities.Patient;
import com.healthtime.healttimebackend.entities.Soignant;
import com.healthtime.healttimebackend.exceptions.NotFoundException;
import com.healthtime.healttimebackend.repositories.DossierMedicalRepository;
import com.healthtime.healttimebackend.repositories.PatientRepository;
import com.healthtime.healttimebackend.repositories.SoignantRepository;

@Service
public class DossierMedicalService implements IDao<DossierMedical> {

    @Autowired
    private DossierMedicalRepository dossierMedicalRepository;

    @Autowired
    private SoignantRepository soignantRepository;

    @Autowired
    private PatientRepository patientRepository;


    @Override
    public DossierMedical findById(int id) {
        return dossierMedicalRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Dossier médical avec l'ID " + id + " introuvable"));
    }

    @Override
    public List<DossierMedical> findAll() {
        return dossierMedicalRepository.findAll();
    }

    @Override
    public DossierMedical create(DossierMedical dossierMedical) {
        return dossierMedicalRepository.save(dossierMedical);
    }

    @Override
    public DossierMedical update(DossierMedical dossierMedical) {
        DossierMedical existingDossier = dossierMedicalRepository.findById(dossierMedical.getId())
                .orElseThrow(() -> new NotFoundException(
                        "Dossier médical avec l'ID " + dossierMedical.getId() + " introuvable"));

        // existingDossier.setNomPatient(dossierMedical.getNomPatient()); // Exemple de
        // mise à jour d'un champ
        // existingDossier.setDescription(dossierMedical.getDescription()); // Exemple
        // supplémentaire
        // Ajouter ici d'autres champs si nécessaire

        return dossierMedicalRepository.save(existingDossier);
    }

    @Override
    public void delete(int id) {
        DossierMedical dossierMedical = dossierMedicalRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Dossier médical avec l'ID " + id + " introuvable"));

        dossierMedicalRepository.delete(dossierMedical);
    }

    public DossierMedical createDossierMedical(int soignantId, int patientId) {
        // Recherche du soignant et du patient
        Soignant soignant = soignantRepository.findById(soignantId)
                .orElseThrow(() -> new NotFoundException("Soignant avec l'ID " + soignantId + " introuvable"));
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new NotFoundException("Patient avec l'ID " + patientId + " introuvable"));

        // Vérification si un dossier médical existe déjà
        return dossierMedicalRepository.findBySoignantIdAndPatientId(soignantId, patientId)
                .orElseGet(() -> {
                    // Création d'un nouveau dossier médical si non existant
                    DossierMedical dossierMedical = new DossierMedical();
                    dossierMedical.setDateCreation(LocalDateTime.now());
                    dossierMedical.setSoignant(soignant);
                    dossierMedical.setPatient(patient);
                    return dossierMedicalRepository.save(dossierMedical);
                });
    }

    public List<DossierMedicalDTO> getDossiersBySoignantId(int soignantId) {
        Soignant soignant = soignantRepository.findById(soignantId)
                .orElseThrow(() -> new NotFoundException("Soignant avec l'ID " + soignantId + " introuvable"));

        List<DossierMedical> dossiers = dossierMedicalRepository.findBySoignantId(soignantId);

        return dossiers.stream()
                .map(d -> new DossierMedicalDTO(
                        d.getId(),
                        d.getPatient().getNom(),
                        d.getPatient().getPrenom(),
                        d.getConsultations().size(),
                        d.getDateCreation(),
                        d.getPatient().getSexe(),
                        d.getPatient().getTelephone()
                ))
                .collect(Collectors.toList());
    }

    public List<DossierMedicalPatientDTO> getDossiersByPatientId(int patientId) {
        List<DossierMedical> dossierMedicals = dossierMedicalRepository.findByPatientId(patientId);
        return dossierMedicals.stream()
        .map(
             d -> new DossierMedicalPatientDTO(
                     d.getId(),
                     d.getSoignant().getNom(),
                     d.getSoignant().getPrenom(),
                     d.getConsultations().size(),
                     d.getDateCreation(),
                     d.getSoignant().getAdresse(),
                     d.getSoignant().getTelephone()
             )
        ).collect(Collectors.toList());
    }

    // Récupérer un dossier médical spécifique
    public DossierMedical getDossierBySoignantAndPatient(int soignantId, int patientId) {
        DossierMedical dossierMedical = dossierMedicalRepository.findBySoignantIdAndPatientId(soignantId, patientId)
                .orElseThrow(() -> new NotFoundException(
                        "Aucun dossier médical trouvé pour le soignant avec l'ID " + soignantId + " et le patient avec l'ID " + patientId));

        return dossierMedical;
    }

    public List<DossierMedical> searchDossierMedical(int patientId, String query) {
        return dossierMedicalRepository.findBySoignantIdAndPatientNomContainingAndPatientPrenomContaining(patientId, query, query);
    }
}
