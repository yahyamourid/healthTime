package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.Specialite;

@Repository
public interface  SpecialiteRepository extends JpaRepository<Specialite,Integer> {
    
}
