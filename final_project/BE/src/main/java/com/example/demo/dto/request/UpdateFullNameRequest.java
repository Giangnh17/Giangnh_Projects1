package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;

public class UpdateFullNameRequest {
    @NotBlank(message = "Tên đầy đủ không được để trống")
    private String fullName;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}

