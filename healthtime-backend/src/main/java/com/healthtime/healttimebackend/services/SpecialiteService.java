package com.healthtime.healttimebackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthtime.healttimebackend.dao.IDao;
import com.healthtime.healttimebackend.entities.Specialite;
import com.healthtime.healttimebackend.exceptions.NotFoundException;
import com.healthtime.healttimebackend.repositories.SpecialiteRepository;


@Service
public class SpecialiteService implements IDao<Specialite> {

    @Autowired
    private SpecialiteRepository specialiteRepository;

    @Override
    public Specialite findById(int id) {
        Specialite specialite=specialiteRepository.findById(id)
                     .orElseThrow(() -> new NotFoundException("Specialite not found with id : " + id));
           return specialite;
    }

    @Override
    public List<Specialite> findAll() {
         List<Specialite> specialites=specialiteRepository.findAll();
         return specialites;
       
    }

    @Override
    public Specialite create(Specialite o) {
        return specialiteRepository.save(o);
    }

    @Override
    public Specialite update(Specialite o) {
        Specialite specialite=specialiteRepository.findById(o.getId())
        .orElseThrow(() -> new NotFoundException("Specialite not found with id : " + o.getId()));
        specialite.setNom(o.getNom());
        return specialiteRepository.save(specialite);
    }

    @Override
    public void delete(int id) {
        Specialite specialite=specialiteRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Specialite not found with id : " + id));
        specialiteRepository.delete(specialite);
    }
    
}
