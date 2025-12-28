package com.example.demo.dto.request;

public class PageRequest {
    private int page = 0;
    private int size = 10;
    private String sortBy;
    private String sortDirection = "ASC";
    private String search; // Từ khóa tìm kiếm

    public PageRequest() {
    }

    public PageRequest(int page, int size, String sortBy, String sortDirection) {
        this.page = page;
        this.size = size;
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
    }

    // Getters và Setters với validation
    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = Math.max(0, page); // Không cho phép page âm
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        // Giới hạn size từ 1 đến 100
        if (size > 0 && size <= 100) {
            this.size = size;
        } else {
            this.size = 10; // Default
        }
    }

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    public String getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(String sortDirection) {
        // Chỉ chấp nhận ASC hoặc DESC
        if ("DESC".equalsIgnoreCase(sortDirection)) {
            this.sortDirection = "DESC";
        } else {
            this.sortDirection = "ASC";
        }
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    // Helper method tính offset (cho raw SQL)
    public int getOffset() {
        return page * size;
    }

    @Override
    public String toString() {
        return "PageRequestDto{" +
                "page=" + page +
                ", size=" + size +
                ", sortBy='" + sortBy + '\'' +
                ", sortDirection='" + sortDirection + '\'' +
                '}';
    }
}
