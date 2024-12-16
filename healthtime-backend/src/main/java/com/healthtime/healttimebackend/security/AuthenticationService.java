package com.healthtime.healttimebackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.healthtime.healttimebackend.dto.LoginResponse;
import com.healthtime.healttimebackend.dto.LoginUserDTO;
import com.healthtime.healttimebackend.entities.Patient;
import com.healthtime.healttimebackend.entities.Role;
import com.healthtime.healttimebackend.entities.Soignant;
import com.healthtime.healttimebackend.entities.User;
import com.healthtime.healttimebackend.exceptions.AccountBlockedException;
import com.healthtime.healttimebackend.exceptions.AlreadyExistException;
import com.healthtime.healttimebackend.exceptions.NotFoundException;
import com.healthtime.healttimebackend.repositories.PatientRepository;
import com.healthtime.healttimebackend.repositories.RoleRepository;
import com.healthtime.healttimebackend.repositories.SoignantRepository;
import com.healthtime.healttimebackend.repositories.UserRepository;
import com.healthtime.healttimebackend.utils.SendEmail;

import jakarta.mail.MessagingException;

@Service
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private SoignantRepository soignantRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private SendEmail sendEmail;

    // public AuthenticationService(
    // UserRepository userRepository,
    // AuthenticationManager authenticationManager,
    // PasswordEncoder passwordEncoder) {
    // this.authenticationManager = authenticationManager;
    // this.userRepository = userRepository;
    // this.passwordEncoder = passwordEncoder;
    // }

    public Soignant signupSoignant(Soignant input) {
        if (userRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new AlreadyExistException("Email is already registered");
        }
        Role role = roleRepository.findById(2)
                .orElseThrow(() -> new NotFoundException("Role not found"));
        input.setRole(role);
        input.setBlock(true);
        input.setAccepted(false);
        input.setRejected(false);
        input.setPassword(passwordEncoder.encode(input.getPassword()));

        return soignantRepository.save(input);
    }

    public Patient signupPatient(Patient input) {
        if (userRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new AlreadyExistException("Email is already registered");
        }
        Role role = roleRepository.findById(3)
                .orElseThrow(() -> new NotFoundException("Role not found"));
        input.setRole(role);
        input.setPassword(passwordEncoder.encode(input.getPassword()));

        return patientRepository.save(input);
    }

    public LoginResponse authenticate(LoginUserDTO input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new NotFoundException("Invalid email or password"));

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()));
        } catch (AuthenticationException e) {
            if (user.isBlock() && passwordEncoder.matches(input.getPassword(),user.getPassword())) 
                throw new AccountBlockedException("Account is blocked. Please contact support.");
            else
                throw new NotFoundException("Invalid email or password");
            
        }

        String jwtToken = jwtService.generateToken(user);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return loginResponse;
    }

    public void activateAccount(int userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        user.setBlock(false);
        userRepository.save(user);
    }

    public void acceptDemand(int userId) throws MessagingException{
        Soignant user = soignantRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        user.setBlock(false);
        user.setAccepted(true);
        sendEmail.sendAcceptEmail(user.getEmail(), user.getNom(), user.getPrenom());
        userRepository.save(user);
    }

    public void rejectDemand(int userId) throws MessagingException{
        Soignant user = soignantRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        user.setRejected(true);
        sendEmail.sendRefuseEmail(user.getEmail(), user.getNom(), user.getPrenom());
        userRepository.save(user);
    }

    public void desactivateAccount(int userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        user.setBlock(true);
        userRepository.save(user);
    }

    public boolean isUserExit(String email){
        return userRepository.findByEmail(email).isPresent();
    }

}
