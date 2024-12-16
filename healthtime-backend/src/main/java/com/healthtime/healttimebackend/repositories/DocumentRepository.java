package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document,Integer> {
    
}
