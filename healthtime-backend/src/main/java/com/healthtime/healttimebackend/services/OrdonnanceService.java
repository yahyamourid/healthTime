package com.healthtime.healttimebackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthtime.healttimebackend.dao.IDao;
import com.healthtime.healttimebackend.entities.Consultation;
import com.healthtime.healttimebackend.entities.Ordonnance;
import com.healthtime.healttimebackend.exceptions.NotFoundException;
import com.healthtime.healttimebackend.repositories.ConsultationRepository;
import com.healthtime.healttimebackend.repositories.OrdonnanceRepository;

@Service
public class OrdonnanceService implements IDao<Ordonnance> {
    
    @Autowired
    private OrdonnanceRepository ordonnanceRepository;
    
    @Autowired
    private ConsultationRepository consultationRepository;

    @Override
    public Ordonnance findById(int id) {
        return ordonnanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ordonnance avec l'ID " + id + " introuvable"));
    }

    @Override
    public List<Ordonnance> findAll() {
        return ordonnanceRepository.findAll();
    }

    @Override
    public Ordonnance create(Ordonnance ordonnance) {
        return ordonnanceRepository.save(ordonnance);
    }

    @Override
    public Ordonnance update(Ordonnance ordonnance) {
        Ordonnance existingOrdonnance = ordonnanceRepository.findById(ordonnance.getId())
                .orElseThrow(() -> new NotFoundException("Ordonnance avec l'ID " + ordonnance.getId() + " introuvable"));

        // existingOrdonnance.setMedicaments(ordonnance.getMedicaments());
        // existingOrdonnance.setDate(ordonnance.getDate());
        // Ajoutez ici d'autres champs à mettre à jour

        return ordonnanceRepository.save(existingOrdonnance);
    }

    @Override
    public void delete(int id) {
        Ordonnance ordonnance = ordonnanceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ordonnance avec l'ID " + id + " introuvable"));

        ordonnanceRepository.delete(ordonnance);
    }

    
    public Ordonnance createOrdonnance(int consultationId, Ordonnance ordonnance) {
        // Vérification de l'existence de la consultation
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new RuntimeException("Consultation avec l'ID " + consultationId + " n'existe pas"));

        // Associer la consultation à l'ordonnance
        ordonnance.setConsultation(consultation);

        // Sauvegarder l'ordonnance dans le repository
        return ordonnanceRepository.save(ordonnance);
    }
}
