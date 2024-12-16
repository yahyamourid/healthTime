package com.healthtime.healttimebackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthtime.healttimebackend.dao.IDao;
import com.healthtime.healttimebackend.entities.Analyse;
import com.healthtime.healttimebackend.entities.Consultation;
import com.healthtime.healttimebackend.entities.DossierMedical;
import com.healthtime.healttimebackend.entities.Ordonnance;
import com.healthtime.healttimebackend.exceptions.NotFoundException;
import com.healthtime.healttimebackend.repositories.AnalyseRepository;
import com.healthtime.healttimebackend.repositories.ConsultationRepository;
import com.healthtime.healttimebackend.repositories.DossierMedicalRepository;
import com.healthtime.healttimebackend.repositories.OrdonnanceRepository;

@Service
public class ConsultationService implements IDao<Consultation> {

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private DossierMedicalRepository dossierMedicalRepository;

    @Autowired
    private OrdonnanceRepository ordonnanceRepository;

    @Autowired
    private AnalyseRepository analyseRepository;

    @Override
    public Consultation findById(int id) {
        return consultationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Consultation avec l'ID " + id + " introuvable"));
    }

    @Override
    public List<Consultation> findAll() {
        return consultationRepository.findAll();
    }

    @Override
    public Consultation create(Consultation consultation) {
        return consultationRepository.save(consultation);
    }

    @Override
    public Consultation update(Consultation consultation) {
        Consultation existingConsultation = consultationRepository.findById(consultation.getId())
                .orElseThrow(
                        () -> new NotFoundException("Consultation avec l'ID " + consultation.getId() + " introuvable"));

        // existingConsultation.setDate(consultation.getDate());
        // existingConsultation.setDetails(consultation.getDetails());
        // Ajoutez ici d'autres champs à mettre à jour

        return consultationRepository.save(existingConsultation);
    }

    @Override
    public void delete(int id) {
        Consultation consultation = consultationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Consultation avec l'ID " + id + " introuvable"));

        consultationRepository.delete(consultation);
    }

    public Consultation createConsultation(int dossierMedicalId, Consultation consultation) {
        // Vérification de l'existence du dossier médical
        DossierMedical dossierMedical = dossierMedicalRepository.findById(dossierMedicalId)
                .orElseThrow(
                        () -> new RuntimeException("Dossier médical avec l'ID " + dossierMedicalId + " n'existe pas"));
        if (dossierMedical.getConsultations().size() == 0)
            consultation.setType("premiere consultation");
        else
            consultation.setType("contrôle");

        List<Ordonnance> ordonnances = ordonnanceRepository.saveAll(consultation.getOrdonnances());
        List<Analyse> analyses = analyseRepository.saveAll(consultation.getAnalyses());

        consultation.setDossierMedical(dossierMedical);
        consultation.setOrdonnances(ordonnances);
        consultation.setAnalyses(analyses);
        return consultationRepository.save(consultation);
    }
}
