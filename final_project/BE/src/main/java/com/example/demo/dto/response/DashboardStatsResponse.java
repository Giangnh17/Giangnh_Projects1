package com.example.demo.dto.response;

import java.util.Map;

/**
 * DTO cho dashboard statistics
 * Bao gồm:
 * - totalBooks: Tổng số sách
 * - availableBooks: Số sách có sẵn (status = "AVAILABLE")
 * - borrowedBooks: Số sách đang được mượn (status = "BORROWED")
 * - categoryStats: Map<Category, Count> - Thống kê số sách theo danh mục
 * - statusStats: Map<Status, Count> - Thống kê số sách theo trạng thái (cho pie chart)
 */
public class DashboardStatsResponse {
    private long totalBooks;
    private long availableBooks;
    private long borrowedBooks;
    private Map<String, Long> categoryStats;  // {category: count}
    private Map<String, Long> statusStats;    // {status: count}

    public DashboardStatsResponse() {
    }

    public DashboardStatsResponse(long totalBooks, long availableBooks, long borrowedBooks,
                                  Map<String, Long> categoryStats, Map<String, Long> statusStats) {
        this.totalBooks = totalBooks;
        this.availableBooks = availableBooks;
        this.borrowedBooks = borrowedBooks;
        this.categoryStats = categoryStats;
        this.statusStats = statusStats;
    }

    public long getTotalBooks() {
        return totalBooks;
    }

    public void setTotalBooks(long totalBooks) {
        this.totalBooks = totalBooks;
    }

    public long getAvailableBooks() {
        return availableBooks;
    }

    public void setAvailableBooks(long availableBooks) {
        this.availableBooks = availableBooks;
    }

    public long getBorrowedBooks() {
        return borrowedBooks;
    }

    public void setBorrowedBooks(long borrowedBooks) {
        this.borrowedBooks = borrowedBooks;
    }

    public Map<String, Long> getCategoryStats() {
        return categoryStats;
    }

    public void setCategoryStats(Map<String, Long> categoryStats) {
        this.categoryStats = categoryStats;
    }

    public Map<String, Long> getStatusStats() {
        return statusStats;
    }

    public void setStatusStats(Map<String, Long> statusStats) {
        this.statusStats = statusStats;
    }
}

