package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message,Integer> {
    
}
