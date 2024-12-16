package com.healthtime.healttimebackend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.Soignant;

@Repository
public interface SoignantRepository extends JpaRepository<Soignant, Integer> {
    @Query(value = """
            SELECT type, id, nom, prenom, adresse, ville_id
            FROM (
                SELECT 'specialite' AS type, s.id, s.nom, NULL AS prenom, NULL AS adresse, NULL AS ville_id
                FROM specialite s
                WHERE LOWER(s.nom) LIKE LOWER(CONCAT('%', :prefix, '%'))
                UNION
                SELECT 'soignant' AS type, u.id, u.nom, u.prenom, so.adresse, so.ville_id
                FROM user u
                JOIN soignant so ON u.id = so.id
                WHERE LOWER(u.nom) LIKE LOWER(CONCAT('%', :prefix, '%')) and so.accepted = true
            ) AS combined_result
            LIMIT :limit;
            """, nativeQuery = true)
    List<Object[]> findBySpecialiteAndSoignant(@Param("prefix") String prefix, @Param("limit") int limit);

    @Query("SELECT s FROM Soignant s JOIN s.specialites sp WHERE sp.id = :specialiteId")
    List<Soignant> findSoignantsBySpecialiteId(@Param("specialiteId") int specialiteId);

    @Query("SELECT s FROM Soignant s " +
            "JOIN s.specialites sp " +
            "JOIN s.ville v " +
            "WHERE sp.id = :specialiteId AND v.id = :villeId")
    List<Soignant> findSoignantsBySpecialiteIdAndVilleId(@Param("specialiteId") int specialiteId,
            @Param("villeId") int villeId);

    List<Soignant> findByAcceptedFalseAndRejectedFalseOrderByDateInscriptionAsc();

    // Compter les dossiers médicaux pour un soignant donné
    @Query("SELECT COUNT(d) FROM DossierMedical d WHERE d.soignant.id = :soignantId")
    long countDossiersMedicauxBySoignantId(int soignantId);

    @Query("SELECT COUNT(c) FROM Consultation c " +
            "JOIN c.dossierMedical d " +
            "JOIN d.soignant s " +
            "WHERE s.id = :soignantId")
    long countConsultationsBySoignantId(@Param("soignantId") int soignantId);

    // Compter les rendez-vous pour un soignant donné
    @Query("SELECT COUNT(r) FROM RendezVous r WHERE r.soignant.id = :soignantId")
    long countRendezVousBySoignantId(int soignantId);

    // Compter les rendez-vous par état
    @Query("SELECT COUNT(r) FROM RendezVous r WHERE r.soignant.id = :soignantId AND r.etat = :etat")
    long countRendezVousByEtat(int soignantId, String etat);

    // Compter le nombre de patients hommes
    @Query("SELECT COUNT(DISTINCT d.patient.id) FROM DossierMedical d WHERE d.soignant.id = :soignantId AND d.patient.sexe = 'Homme'")
    long countPatientsHommes(int soignantId);

    // Compter le nombre de patients femmes
    @Query("SELECT COUNT(DISTINCT d.patient.id) FROM DossierMedical d WHERE d.soignant.id = :soignantId AND d.patient.sexe = 'Femme'")
    long countPatientsFemmes(int soignantId);

}
