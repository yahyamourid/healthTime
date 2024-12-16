package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer>{

    
} 
