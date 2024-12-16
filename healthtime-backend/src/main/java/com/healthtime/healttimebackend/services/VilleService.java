package com.healthtime.healttimebackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthtime.healttimebackend.dao.IDao;
import com.healthtime.healttimebackend.entities.Ville;
import com.healthtime.healttimebackend.exceptions.NotFoundException;
import com.healthtime.healttimebackend.repositories.VilleRepository;

@Service
public class VilleService implements IDao<Ville>{

    @Autowired
    private VilleRepository villeRepository;
    @Override
    public Ville findById(int id) {
        Ville ville = villeRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("City with id " + id + " not found"));
        return ville;
    }

    @Override
    public List<Ville> findAll() {
        List<Ville> villes = villeRepository.findAll();
        return villes;
    }

    @Override
    public Ville create(Ville o) {
        return villeRepository.save(o);
    }

    @Override
    public Ville update(Ville o) {
        Ville ville = villeRepository.findById(o.getId())
                    .orElseThrow(() -> new NotFoundException("City with id " + o.getId() + " not found"));
        ville.setNom(o.getNom());
        return villeRepository.save(ville);
    }

    @Override
    public void delete(int id) {
        Ville ville = villeRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("City with id " + id + " not found"));
        villeRepository.delete(ville);
    }
    
}
