package com.example.demo.service.impl;

import com.example.demo.dto.request.UpdateFullNameRequest;
import com.example.demo.dto.request.UpdatePasswordRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> updatePassword(UpdatePasswordRequest request) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
            }

            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            User user = userRepository.findByEmail(userDetails.getUsername());

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            // Check if user is admin
            if (user.getRole().getRoleName().equals("ROLE_ADMIN")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Admin không được phép thay đổi mật khẩu qua API này");
            }

            // Verify old password
            if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu cũ không đúng");
            }

            // Update password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);

            return ResponseEntity.ok("Cập nhật mật khẩu thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating password: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> updateFullName(UpdateFullNameRequest request) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
            }

            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            User user = userRepository.findByEmail(userDetails.getUsername());

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            // Check if user is NOT admin
            if (user.getRole().getRoleName().equals("ROLE_ADMIN")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Admin không được phép thay đổi tên qua API này");
            }

            // Update full name
            user.setFullName(request.getFullName());
            userRepository.save(user);

            return ResponseEntity.ok("Cập nhật tên thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating full name: " + e.getMessage());
        }
    }
}

