package com.healthtime.healttimebackend.services;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthtime.healttimebackend.dao.IDao;
import com.healthtime.healttimebackend.entities.Patient;
import com.healthtime.healttimebackend.exceptions.NotFoundException;
import com.healthtime.healttimebackend.repositories.PatientRepository;


@Service
public class PatientService implements IDao<Patient> {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Patient findById(int id) {
        Patient patient=patientRepository.findById(id)
                     .orElseThrow(() -> new NotFoundException("Patient not found with id : " + id));
           return patient;
    }

    @Override
    public List<Patient> findAll() {
         List<Patient> patients=patientRepository.findAll();
         return patients;
       
    }

    @Override
    public Patient create(Patient o) {
        return patientRepository.save(o);
    }

    @Override
    public Patient update(Patient o) {
        Patient patient=patientRepository.findById(o.getId())
        .orElseThrow(() -> new NotFoundException("Patient not found with id : " + o.getId()));
        return patientRepository.save(patient);
    }

    @Override
    public void delete(int id) {
        Patient patient=patientRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Patient not found with id : " + id));
        patientRepository.delete(patient);
    }
    
}
