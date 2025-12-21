package com.example.demo.controller;

import com.example.demo.dto.request.UpdateFullNameRequest;
import com.example.demo.dto.request.UpdatePasswordRequest;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/password")
    public ResponseEntity<?> updatePassword(@RequestBody @Valid UpdatePasswordRequest request) {
        return userService.updatePassword(request);
    }

    @PutMapping("/fullname")
    public ResponseEntity<?> updateFullName(@RequestBody @Valid UpdateFullNameRequest request) {
        return userService.updateFullName(request);
    }
}

