package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.healthtime.healttimebackend.entities.Ville;

@Repository
public interface VilleRepository extends JpaRepository<Ville, Integer>{
    
}
