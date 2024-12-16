package com.healthtime.healttimebackend.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthtime.healttimebackend.dao.IDao;
import com.healthtime.healttimebackend.dto.DemandDTO;
import com.healthtime.healttimebackend.dto.ImageDTO;
import com.healthtime.healttimebackend.dto.SearchResult;
import com.healthtime.healttimebackend.dto.SoignantDTO;
import com.healthtime.healttimebackend.dto.SoignantDashboardDTO;
import com.healthtime.healttimebackend.entities.Soignant;
import com.healthtime.healttimebackend.entities.Specialite;
import com.healthtime.healttimebackend.exceptions.NotFoundException;
import com.healthtime.healttimebackend.repositories.SoignantRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SoignantService implements IDao<Soignant> {

    @Autowired
    private SoignantRepository soignantRepository;
    @Autowired
    private VilleService villeService;

    public DemandDTO convertToDTo(Soignant soignant) {
        return new DemandDTO(
                soignant.getId(),
                soignant.getNom(),
                soignant.getPrenom(),
                soignant.getEmail(),
                soignant.getTelephone(),
                soignant.getAdresse(),
                soignant.getTarif(),
                soignant.getDateInscription(),
                soignant.getSpecialites());
    }

    private SoignantDTO convertToSoignantDTO(Soignant soignant) {
        return new SoignantDTO(
                soignant.getId(),
                soignant.getNom(),
                soignant.getPrenom(),
                soignant.getAdresse(),
                soignant.getVille() != null ? soignant.getVille().getNom() : null,
                soignant.getTarif(),
                soignant.getLatitude(),
                soignant.getLongitude(),
                soignant.getDureeConsultation(),
                soignant.getVille(),
                soignant.getSpecialites(),
                soignant.getDiplomes(),
                soignant.getExperiences(),
                soignant.getPresentation(),
                soignant.getEmail(),
                soignant.getTelephone());
    }

    @Override
    public Soignant findById(int id) {
        Soignant soignant = soignantRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Soignant not found with id : " + id));
        return soignant;
    }

    public SoignantDTO findByIdDTO(int id) {
        Soignant soignant = soignantRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Soignant not found with id : " + id));
        return convertToSoignantDTO(soignant);
    }

    @Override
    public List<Soignant> findAll() {
        List<Soignant> soignants = soignantRepository.findAll();
        return soignants;

    }

    @Override
    public Soignant create(Soignant o) {
        return soignantRepository.save(o);
    }

    

    @Override
    public Soignant update(Soignant o) {
        Soignant soignant = soignantRepository.findById(o.getId())
                .orElseThrow(() -> new NotFoundException("Soignant not found with id : " + o.getId()));
        return soignantRepository.save(soignant);
    }

    @Override
    public void delete(int id) {
        Soignant soignant = soignantRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Soignant not found with id : " + id));
        soignantRepository.delete(soignant);
    }

    public SearchResult search(String prefix, int limit) {
        List<Object[]> results = soignantRepository.findBySpecialiteAndSoignant(prefix, limit);

        List<Specialite> specialites = new ArrayList<>();
        List<SoignantDTO> soignants = new ArrayList<>();

        for (Object[] result : results) {
            String type = (String) result[0];
            Integer id = ((Number) result[1]).intValue();
            String nom = (String) result[2];
            String prenom = (String) result[3];
            String adresse = (String) result[4];
            Integer villeid = (Integer) result[5];

            if ("specialite".equals(type)) {
                specialites.add(new Specialite(id, nom));
            } else if ("soignant".equals(type)) {
                soignants.add(new SoignantDTO(id, nom, prenom, adresse, villeService.findById(villeid).getNom()));
            }
        }

        return new SearchResult(specialites, soignants);
    }

    public List<SoignantDTO> findSoignantsBySpecialiteId(int specialiteId, int villeId) {
        if(villeId == 0)
            return soignantRepository.findSoignantsBySpecialiteId(specialiteId).stream()
            .map(this::convertToSoignantDTO)
            .toList();
        else 
            return soignantRepository.findSoignantsBySpecialiteIdAndVilleId(specialiteId, villeId).stream()
            .map(this::convertToSoignantDTO)
            .toList();
    }

    public List<DemandDTO> getAllDemands() {
        List<Soignant> soignants = soignantRepository.findByAcceptedFalseAndRejectedFalseOrderByDateInscriptionAsc();
        return soignants.stream()
                .map(this::convertToDTo)
                .toList();
    }

    public ImageDTO getcertificat(int id) {
        Soignant soignant = soignantRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Soignant not found with id : " + id));
        return new ImageDTO(soignant.getCertificat());
    }

    public SoignantDashboardDTO dashboardSoignant(int soignantId) {
        SoignantDashboardDTO dashboard = new SoignantDashboardDTO();

        long totalPatients = soignantRepository.countDossiersMedicauxBySoignantId(soignantId);
        long totalRendezVous = soignantRepository.countRendezVousBySoignantId(soignantId);

        long rendezVousEnCours = soignantRepository.countRendezVousByEtat(soignantId, "en-cours");
        long rendezVousFait = soignantRepository.countRendezVousByEtat(soignantId, "fait");
        long rendezVousAnnule = soignantRepository.countRendezVousByEtat(soignantId, "annule");

        long hommes = soignantRepository.countPatientsHommes(soignantId);
        long femmes = soignantRepository.countPatientsFemmes(soignantId);
        long totalConsultations = soignantRepository.countConsultationsBySoignantId(soignantId);

        double proportionHommes = (totalPatients > 0) ? (double) hommes / totalPatients * 100 : 0;
        double proportionFemmes = (totalPatients > 0) ? (double) femmes / totalPatients * 100 : 0;

        dashboard.setSoignantId(soignantId);
        dashboard.setNombrePatients(totalPatients);
        dashboard.setNombreConsultations(totalConsultations);
        dashboard.setNombreRendezVous(totalRendezVous);
        dashboard.setRendezVousEnCours(rendezVousEnCours);
        dashboard.setRendezVousFait(rendezVousFait);
        dashboard.setRendezVousAnnule(rendezVousAnnule);
        dashboard.setHommes(hommes);
        dashboard.setFemmes(femmes);
        dashboard.setProportionHommes(proportionHommes);
        dashboard.setProportionFemmes(proportionFemmes);

        return dashboard;
    }

}
