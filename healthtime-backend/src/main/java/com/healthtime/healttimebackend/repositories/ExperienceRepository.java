package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.Experience;

@Repository
public interface ExperienceRepository  extends JpaRepository<Experience,Integer> {
    
}
