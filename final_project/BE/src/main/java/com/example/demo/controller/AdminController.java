package com.example.demo.controller;

import com.example.demo.dto.request.UpdateUserRoleRequest;
import com.example.demo.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return adminService.getAllUsers(page, size);
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<?> updateUserRole(
            @PathVariable Long userId,
            @RequestBody @Valid UpdateUserRoleRequest request) {
        return adminService.updateUserRole(userId, request);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> softDeleteUser(@PathVariable Long userId) {
        return adminService.softDeleteUser(userId);
    }
}

