package com.example.demo.controller;

import com.example.demo.config.SecurityConfig;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private SecurityConfig securityConfig;

    @GetMapping("/hello")
    public String hello() {
        return "Hello";
    }

    @PostMapping("/dang-ky-admin")
    public void dangKyAdmin() {
        com.example.demo.entity.Role roleAdmin = new com.example.demo.entity.Role();
        roleAdmin.setRoleName("ROLE_ADMIN");
        roleRepository.save(roleAdmin);


        com.example.demo.entity.User admin = new com.example.demo.entity.User();
        admin.setEmail("admin@gmail.com");
        admin.setPassword(securityConfig.passwordEncoder().encode("admin"));
        admin.setRole(roleAdmin);
        userRepository.save(admin);
    }

    @PostMapping("/dang-ky-user")
    public void dangKyUser() {
        com.example.demo.entity.Role roleUser = new com.example.demo.entity.Role();
        roleUser.setRoleName("ROLE_USER");
        roleRepository.save(roleUser);

        com.example.demo.entity.User user = new com.example.demo.entity.User();
        user.setEmail("user@gmail.com");
        user.setPassword(securityConfig.passwordEncoder().encode("user"));
        user.setRole(roleUser);
        userRepository.save(user);
    }
}