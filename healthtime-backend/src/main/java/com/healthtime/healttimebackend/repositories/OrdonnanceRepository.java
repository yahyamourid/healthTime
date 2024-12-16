package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.Ordonnance;


@Repository
public interface OrdonnanceRepository extends JpaRepository<Ordonnance,Integer> {
    
}
