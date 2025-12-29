package com.example.demo.service.impl;

import com.example.demo.config.JwtService;
import com.example.demo.dto.request.LoginRequest;
import com.example.demo.dto.request.RegisterRequest;
import com.example.demo.dto.response.UserProfileResponse;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public AuthServiceImpl(AuthenticationManager authManager,
                          JwtService jwtService,
                          UserDetailsService userDetailsService,
                          PasswordEncoder passwordEncoder,
                          UserRepository userRepository,
                          RoleRepository roleRepository) {
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public ResponseEntity<?> register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        Role role = roleRepository.findByRoleName("ROLE_USER");

        User user = new User();
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        userRepository.save(user);

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(user.getEmail());

        String roleName = userDetails.getAuthorities().stream()
                .findFirst()
                .map(auth -> auth.getAuthority())
                .orElse("ROLE_USER");

        return ResponseEntity.ok(jwtService.generateTokenWithRole(userDetails, roleName));
    }

    @Override
    public ResponseEntity<?> login(LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserDetails user = userDetailsService.loadUserByUsername(request.getEmail());

        String roleName = user.getAuthorities().stream()
                .findFirst()
                .map(auth -> auth.getAuthority())
                .orElse("ROLE_USER");

        return ResponseEntity.ok(jwtService.generateTokenWithRole(user, roleName));
    }

    @Override
    public ResponseEntity<?> profile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        UserDetails user = (UserDetails) auth.getPrincipal();

        User UserLogin = userRepository.findByEmail(user.getUsername());
        UserProfileResponse userProfileResponse = new UserProfileResponse();
        userProfileResponse.setId(UserLogin.getId());
        userProfileResponse.setEmail(UserLogin.getEmail());
        userProfileResponse.setFullName(UserLogin.getFullName());
        userProfileResponse.setRole(UserLogin.getRole().getRoleName());

        return ResponseEntity.ok(userProfileResponse);
    }
}
