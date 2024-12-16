package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.AntecedentMedical;

@Repository
public interface AntecedentMedicalRepository extends JpaRepository<AntecedentMedical,Integer> {
    
}
