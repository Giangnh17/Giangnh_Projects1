package com.example.demo.controller;

import com.example.demo.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    /**
     * GET /api/dashboard/stats
     * Lấy tất cả thống kê cho dashboard
     *
     * Response format:
     * {
     *   "totalBooks": 10,
     *   "availableBooks": 6,
     *   "borrowedBooks": 3,
     *   "categoryStats": {
     *     "Children": 4,
     *     "Romance": 2,
     *     "Fantasy": 1,
     *     ...
     *   },
     *   "statusStats": {
     *     "AVAILABLE": 6,
     *     "BORROWED": 3,
     *     "DAMAGED": 1
     *   }
     * }
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getDashboardStats() {
        return dashboardService.getDashboardStats();
    }
}

