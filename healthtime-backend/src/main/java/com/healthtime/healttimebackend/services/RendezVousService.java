package com.healthtime.healttimebackend.services;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthtime.healttimebackend.dao.IDao;
import com.healthtime.healttimebackend.dto.RendezVousDTO;
import com.healthtime.healttimebackend.dto.RendezVousPatientDTO;
import com.healthtime.healttimebackend.entities.Patient;
import com.healthtime.healttimebackend.entities.RendezVous;
import com.healthtime.healttimebackend.entities.Soignant;
import com.healthtime.healttimebackend.exceptions.NotFoundException;
import com.healthtime.healttimebackend.repositories.PatientRepository;
import com.healthtime.healttimebackend.repositories.RendezVousRepository;
import com.healthtime.healttimebackend.repositories.SoignantRepository;

@Service
public class RendezVousService implements IDao<RendezVous> {

    @Autowired
    private RendezVousRepository rendezVousRepository;

    @Autowired
    private SoignantRepository soignantRepository;

    @Autowired
    private PatientRepository patientRepository;

    public RendezVousDTO convertToDTo(RendezVous rendezVous) {
        return new RendezVousDTO(rendezVous.getId(), rendezVous.getEtat(), rendezVous.getDateRendez(),
                rendezVous.getPatient().getNom(), rendezVous.getPatient().getPrenom(),
                rendezVous.getPatient().getTelephone(),
                rendezVous.getPatient().getAdresse(),
                rendezVous.getPatient().getDateNaissance(),
                rendezVous.getPatient().getSexe(),
                rendezVous.getPatient().getEmail(),
                rendezVous.getIsCheckUp(),
                rendezVous.getPatient().getId());
    }

    public RendezVousPatientDTO convertToRendezVousDTO(RendezVous rendezVous) {
        return new RendezVousPatientDTO(
                rendezVous.getId(),
                rendezVous.getSoignant().getNom(),
                rendezVous.getSoignant().getPrenom(),
                rendezVous.getEtat(),
                rendezVous.getIsCheckUp(),
                rendezVous.getDateRendez(),
                rendezVous.getPatient().getAdresse(),
                rendezVous.getPatient().getTelephone());
    }

    public Map<String, Map<Integer, List<Integer>>> getDisponibilites(int medecinId) {
        Soignant soignant = soignantRepository.findById(medecinId)
                .orElseThrow(() -> new IllegalArgumentException("Soignant not found"));
        LocalTime dateDebut = soignant.getDateDebut();
        LocalTime dateFin = soignant.getDateFin();
        int dureeConsultation = soignant.getDureeConsultation();

        Map<LocalDate, Map<Integer, List<Integer>>> disponibilitesTemp = new HashMap<>();
        LocalDate today = LocalDate.now();

        for (int i = 0; i < 14; i++) {
            LocalDate dateJour = today.plusDays(i);
            DayOfWeek jour = dateJour.getDayOfWeek();

            if (jour == DayOfWeek.SATURDAY || jour == DayOfWeek.SUNDAY)
                continue;

            Map<Integer, List<Integer>> heuresDuJour = new HashMap<>();
            int tranchesParHeure = 60 / dureeConsultation;

            for (LocalTime heure = dateDebut; heure.isBefore(dateFin); heure = heure.plusHours(1)) {
                int hour = heure.getHour();
                List<Integer> tranches = new ArrayList<>(Collections.nCopies(tranchesParHeure, 0));

                for (int tranche = 0; tranche < tranchesParHeure; tranche++) {
                    LocalDateTime dateHeure = dateJour.atTime(heure).plusMinutes(tranche * dureeConsultation);
                    boolean estOccupe = rendezVousRepository.existsBySoignant_IdAndDateRendez(medecinId, dateHeure);
                    if (estOccupe) {
                        tranches.set(tranche, 1);
                    }
                }

                heuresDuJour.put(hour, tranches);
            }

            disponibilitesTemp.put(dateJour, heuresDuJour);
        }

        // Trier les disponibilités par date
        Map<String, Map<Integer, List<Integer>>> disponibilites = new LinkedHashMap<>();
        disponibilitesTemp.entrySet().stream()
                .sorted(Map.Entry.comparingByKey()) // Tri par clé (LocalDate)
                .forEach(entry -> {
                    LocalDate dateJour = entry.getKey();
                    String jourAvecDate = String.format("%s %d %s",
                            dateJour.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.FRENCH),
                            dateJour.getDayOfMonth(),
                            dateJour.getMonth().getDisplayName(TextStyle.FULL, Locale.FRENCH));
                    disponibilites.put(jourAvecDate, entry.getValue());
                });

        return disponibilites;
    }

    @Override
    public RendezVous findById(int id) {
        RendezVous rendezVous = rendezVousRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("RendezVous not found with id : " + id));
        return rendezVous;
    }

    @Override
    public List<RendezVous> findAll() {
        List<RendezVous> rendezVouss = rendezVousRepository.findAll();
        return rendezVouss;
    }

    @Override
    public RendezVous create(RendezVous o) {
        return rendezVousRepository.save(o);
    }

    @Override
    public RendezVous update(RendezVous o) {
        RendezVous rendezVous = rendezVousRepository.findById(o.getId())
                .orElseThrow(() -> new NotFoundException("RendezVous not found with id : " + o.getId()));
        rendezVous.setDateRendez(o.getDateRendez());
        rendezVous.setEtat(o.getEtat());
        return rendezVousRepository.save(rendezVous);
    }

    @Override
    public void delete(int id) {
        RendezVous rendezVous = rendezVousRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("RendezVous not found with id : " + id));
        rendezVousRepository.delete(rendezVous);
    }

    public List<RendezVousDTO> findbySoignant(int id) {
        Soignant soignant = soignantRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Soignant not found"));
        List<RendezVous> rendezVous = rendezVousRepository.findBySoignant(soignant);
        return rendezVous.stream()
                .map(this::convertToDTo)
                .toList();

    }

    public List<RendezVousPatientDTO> findByPatient(int id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        List<RendezVous> rendezVous = rendezVousRepository.findByPatient(patient);
        return rendezVous.stream()
                .map(this::convertToRendezVousDTO)
                .toList();
    }

    public void markRendezVousAsDone(int rendezVousId) {
        // Rechercher le rendez-vous par ID
        Optional<RendezVous> optionalRendezVous = rendezVousRepository.findById(rendezVousId);

        if (optionalRendezVous.isPresent()) {
            // Si le rendez-vous existe, modifier son état
            RendezVous rendezVous = optionalRendezVous.get();
            rendezVous.setEtat("fait");
            rendezVousRepository.save(rendezVous); 
        } else {
            throw new RuntimeException("Rendez-vous introuvable avec ID : " + rendezVousId);
        }
    }

    public void cancelRendezVous(int id){
        RendezVous rendezVous = rendezVousRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("RendezVous not found with id : " + id));
        rendezVous.setEtat("annule");
        rendezVousRepository.save(rendezVous);
    }

}
