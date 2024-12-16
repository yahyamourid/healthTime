package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.CenterMedical;

@Repository
public interface CenterMedicalRepository extends JpaRepository<CenterMedical,Integer>  {
    
}
