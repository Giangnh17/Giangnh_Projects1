package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;

public class UpdateUserRoleRequest {
    @NotBlank(message = "Role không được để trống")
    private String roleName;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}

