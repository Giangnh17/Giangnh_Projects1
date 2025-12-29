package com.example.demo.service.impl;

import com.example.demo.dto.request.UpdateUserRoleRequest;
import com.example.demo.dto.response.PageResponse;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public ResponseEntity<?> updateUserRole(Long userId, UpdateUserRoleRequest request) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found with id: " + userId);
            }

            User user = userOptional.get();

            // Find role by name
            Role role = roleRepository.findByRoleName(request.getRoleName());
            if (role == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Role not found: " + request.getRoleName());
            }

            user.setRole(role);
            userRepository.save(user);

            return ResponseEntity.ok("Cập nhật role thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating user role: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> softDeleteUser(Long userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found with id: " + userId);
            }

            User user = userOptional.get();

            // Prevent deleting admin
            if (user.getRole().getRoleName().equals("ROLE_ADMIN")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Không thể xóa tài khoản Admin");
            }

            user.setDeleted(true);
            userRepository.save(user);

            return ResponseEntity.ok("Xóa user thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting user: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getAllUsers(com.example.demo.dto.request.PageRequest pageRequest) {
        try {
            Pageable pageable;

            // Tạo Pageable với sorting nếu có sortBy
            if (pageRequest.getSortBy() != null && !pageRequest.getSortBy().isEmpty()) {
                Sort sort = Sort.by(
                    "DESC".equalsIgnoreCase(pageRequest.getSortDirection())
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC,
                    pageRequest.getSortBy()
                );
                pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize(), sort);
            } else {
                pageable = PageRequest.of(pageRequest.getPage(), pageRequest.getSize());
            }

            Page<User> userPage;

            // Kiểm tra nếu có search keyword thì dùng searchUsers, không thì findAllNotDeleted
            if (pageRequest.getSearch() != null && !pageRequest.getSearch().trim().isEmpty()) {
                // Có search keyword -> tìm kiếm theo email hoặc fullName (chỉ lấy user chưa xóa)
                userPage = userRepository.searchUsers(pageRequest.getSearch().trim(), pageable);
            } else {
                // Không có search keyword -> lấy tất cả users chưa bị xóa
                userPage = userRepository.findAllNotDeleted(pageable);
            }

            PageResponse<User> pageResponse = new PageResponse<>(
                    userPage.getContent(),
                    userPage.getNumber(),
                    userPage.getSize(),
                    userPage.getTotalElements(),
                    userPage.getTotalPages(),
                    userPage.isLast(),
                    userPage.isFirst()
            );

            return ResponseEntity.ok(pageResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving users: " + e.getMessage());
        }
    }
}

