package com.healthtime.healttimebackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthtime.healttimebackend.dto.LoginResponse;
import com.healthtime.healttimebackend.dto.LoginUserDTO;
import com.healthtime.healttimebackend.entities.Patient;
import com.healthtime.healttimebackend.entities.Soignant;
import com.healthtime.healttimebackend.security.AuthenticationService;
import com.healthtime.healttimebackend.utils.SendEmail;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/v0/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private SendEmail sendEmail;

    @PostMapping("/signup/soignant")
    public ResponseEntity<Soignant> registerSoignant(@RequestBody Soignant input) throws MessagingException {
        Soignant registeredSoignant = authenticationService.signupSoignant(input);
        return ResponseEntity.ok(registeredSoignant);
    }

    @PostMapping("/signup/patient")
    public ResponseEntity<Patient> registerPatient(@RequestBody Patient input) throws MessagingException {
        Patient registeredPatient = authenticationService.signupPatient(input);
        return ResponseEntity.ok(registeredPatient);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDTO loginUserDto) {
        LoginResponse loginResponse = authenticationService.authenticate(loginUserDto);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/admin/activate/{userId}")
    public ResponseEntity<Void> activateAccount(@PathVariable int userId) {
        authenticationService.activateAccount(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/admin/desactivate/{userId}")
    public ResponseEntity<Void> desactivateAccount(@PathVariable int userId) {
        authenticationService.desactivateAccount(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/check-email")
    public ResponseEntity<Boolean> checkUserExists(@RequestParam String email) {
        boolean exists = authenticationService.isUserExit(email);
        return ResponseEntity.ok(exists);

    }

    @PostMapping("/admin/reject/{userId}")
    public ResponseEntity<Void> rejectDemand(@PathVariable int userId) throws MessagingException{
        authenticationService.rejectDemand(userId);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/admin/accept/{userId}")
    public ResponseEntity<Void> acceptDemand(@PathVariable int userId) throws MessagingException{
        authenticationService.acceptDemand(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/sendemailtest") 
    public ResponseEntity<Void> sendEmailTest() throws MessagingException{
        sendEmail.sendRefuseEmail("mouridyahya480@gmail.com", "mourid", "yahya");
        return ResponseEntity.noContent().build();
    }
}