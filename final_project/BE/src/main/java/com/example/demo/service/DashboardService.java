package com.example.demo.service;

import org.springframework.http.ResponseEntity;

public interface DashboardService {
    /**
     * @return ResponseEntity chứa DashboardStatsResponse
     */
    ResponseEntity<?> getDashboardStats();
}

