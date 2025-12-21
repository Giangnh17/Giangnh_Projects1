package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;

public class CreateBookRequest {
    @NotBlank(message = "Tiêu đề không được để trống")
    private String title;
    @NotBlank(message = "Tác giả không được để trống")
    private String author;
    @NotBlank(message = "Thể loại không được để trống")
    private String category;
    @NotBlank(message = "Trạng thái không được để trống")
    private String status;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
