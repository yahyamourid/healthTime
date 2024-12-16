package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.Consultation;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation,Integer>  {
    
}
