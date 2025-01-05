package com.healthtime.healttimebackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthtime.healttimebackend.dao.IDao;
import com.healthtime.healttimebackend.entities.Analyse;
import com.healthtime.healttimebackend.entities.Consultation;
import com.healthtime.healttimebackend.exceptions.NotFoundException;
import com.healthtime.healttimebackend.repositories.AnalyseRepository;
import com.healthtime.healttimebackend.repositories.ConsultationRepository;

@Service
public class AnalyseService implements IDao<Analyse> {
    
    @Autowired
    private AnalyseRepository analyseRepository;
    
    @Autowired
    private ConsultationRepository consultationRepository;

    @Override
    public Analyse findById(int id) {
        return analyseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Analyse avec l'ID " + id + " introuvable"));
    }

    @Override
    public List<Analyse> findAll() {
        return analyseRepository.findAll();
    }

    @Override
    public Analyse create(Analyse analyse) {
        return analyseRepository.save(analyse);
    }

    @Override
    public Analyse update(Analyse analyse) {
        Analyse existingAnalyse = analyseRepository.findById(analyse.getId())
                .orElseThrow(() -> new NotFoundException("Analyse avec l'ID " + analyse.getId() + " introuvable"));
        existingAnalyse.setValeur(analyse.getValeur());
        existingAnalyse.setUnite(analyse.getUnite());        
        return analyseRepository.save(existingAnalyse);
    }

    @Override
    public void delete(int id) {
        Analyse analyse = analyseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Analyse avec l'ID " + id + " introuvable"));

        analyseRepository.delete(analyse);
    }


    public Analyse createAnalyse(int consultationId, Analyse analyse) {
        // Vérification de l'existence de la consultation
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new RuntimeException("Consultation avec l'ID " + consultationId + " n'existe pas"));

        // Associer la consultation à l'analyse
        analyse.setConsultation(consultation);

        // Sauvegarder l'analyse dans le repository
        return analyseRepository.save(analyse);
    }
}
