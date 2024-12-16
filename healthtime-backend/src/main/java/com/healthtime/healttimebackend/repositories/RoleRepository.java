package com.healthtime.healttimebackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.healthtime.healttimebackend.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>{
    
}
