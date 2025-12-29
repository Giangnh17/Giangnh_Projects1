package com.example.demo.service.impl;

import com.example.demo.dto.response.DashboardStatsResponse;
import com.example.demo.repository.BookRepository;
import com.example.demo.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Implementation của DashboardService
 * Xử lý logic thống kê cho dashboard
 */
@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public ResponseEntity<?> getDashboardStats() {
        try {
            // 1. Đếm tổng số sách chưa bị xóa
            long totalBooks = bookRepository.countTotalBooks();

            // 2. Đếm số sách AVAILABLE (có sẵn)
            long availableBooks = bookRepository.countByStatus("AVAILABLE");

            // 3. Đếm số sách BORROWED (đang mượn)
            long borrowedBooks = bookRepository.countByStatus("BORROWED");

            // 4. Thống kê số sách theo category (cho biểu đồ cột)
            // Query trả về List<Object[]> với Object[0] = category, Object[1] = count
            List<Object[]> categoryData = bookRepository.countByCategory();
            Map<String, Long> categoryStats = new HashMap<>();
            for (Object[] row : categoryData) {
                String category = (String) row[0];
                Long count = (Long) row[1];
                categoryStats.put(category, count);
            }

            // 5. Thống kê số sách theo status (cho pie chart)
            // Query trả về List<Object[]> với Object[0] = status, Object[1] = count
            List<Object[]> statusData = bookRepository.countByStatusGroup();
            Map<String, Long> statusStats = new HashMap<>();
            for (Object[] row : statusData) {
                String status = (String) row[0];
                Long count = (Long) row[1];
                statusStats.put(status, count);
            }

            // Tạo response object
            DashboardStatsResponse response = new DashboardStatsResponse(
                    totalBooks,
                    availableBooks,
                    borrowedBooks,
                    categoryStats,
                    statusStats
            );

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving dashboard statistics: " + e.getMessage());
        }
    }
}

