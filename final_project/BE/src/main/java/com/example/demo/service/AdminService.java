package com.example.demo.service;

import com.example.demo.dto.request.UpdateUserRoleRequest;
import org.springframework.http.ResponseEntity;

public interface AdminService {
    ResponseEntity<?> updateUserRole(Long userId, UpdateUserRoleRequest request);
    ResponseEntity<?> softDeleteUser(Long userId);
    ResponseEntity<?> getAllUsers(int page, int size);
}

