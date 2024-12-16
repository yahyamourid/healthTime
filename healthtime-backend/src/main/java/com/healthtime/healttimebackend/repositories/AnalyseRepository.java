package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.Analyse;

@Repository
public interface AnalyseRepository extends JpaRepository<Analyse,Integer> {
    
}
