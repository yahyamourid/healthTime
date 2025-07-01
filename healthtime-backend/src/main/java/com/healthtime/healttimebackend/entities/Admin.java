package com.healthtime.healttimebackend.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ADMIN")
//Admin
public class Admin extends User {
    
}
