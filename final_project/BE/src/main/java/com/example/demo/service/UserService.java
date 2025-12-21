package com.example.demo.service;

import com.example.demo.dto.request.UpdateFullNameRequest;
import com.example.demo.dto.request.UpdatePasswordRequest;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> updatePassword(UpdatePasswordRequest request);
    ResponseEntity<?> updateFullName(UpdateFullNameRequest request);
}

