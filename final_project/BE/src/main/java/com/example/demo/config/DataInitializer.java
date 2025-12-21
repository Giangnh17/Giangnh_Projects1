package com.example.demo.config;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Tạo các role mặc định nếu chưa có
        Role userRole = null;
        Role adminRole = null;
        Role librarianRole = null;

        if (roleRepository.findByRoleName("ROLE_USER") == null) {
            userRole = new Role();
            userRole.setRoleName("ROLE_USER");
            userRole = roleRepository.save(userRole);
        } else {
            userRole = roleRepository.findByRoleName("ROLE_USER");
        }

        if (roleRepository.findByRoleName("ROLE_ADMIN") == null) {
            adminRole = new Role();
            adminRole.setRoleName("ROLE_ADMIN");
            adminRole = roleRepository.save(adminRole);
        } else {
            adminRole = roleRepository.findByRoleName("ROLE_ADMIN");
        }

        if (roleRepository.findByRoleName("ROLE_LIBRARIAN") == null) {
            librarianRole = new Role();
            librarianRole.setRoleName("ROLE_LIBRARIAN");
            librarianRole = roleRepository.save(librarianRole);
        } else {
            librarianRole = roleRepository.findByRoleName("ROLE_LIBRARIAN");
        }

        // Tạo tài khoản admin mặc định nếu chưa có
        if (userRepository.findByEmail("admin@gmail.com") == null) {
            User admin = new User();
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("Administrator");
            admin.setRole(adminRole);
            userRepository.save(admin);
            System.out.println("Created admin account: admin@gmail.com / admin123");
        }

        // Tạo tài khoản librarian mặc định nếu chưa có
        if (userRepository.findByEmail("librarian@gmail.com") == null) {
            User librarian = new User();
            librarian.setEmail("librarian@gmail.com");
            librarian.setPassword(passwordEncoder.encode("librarian"));
            librarian.setFullName("Librarian User");
            librarian.setRole(librarianRole);
            userRepository.save(librarian);
            System.out.println("Created librarian account: librarian@gmail.com / librarian");
        }

        // Tạo tài khoản user mặc định nếu chưa có
        if (userRepository.findByEmail("user@gmail.com") == null) {
            User user = new User();
            user.setEmail("user@gmail.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setFullName("Normal User");
            user.setRole(userRole);
            userRepository.save(user);
            System.out.println("Created user account: user@gmail.com / user123");
        }
    }
}
