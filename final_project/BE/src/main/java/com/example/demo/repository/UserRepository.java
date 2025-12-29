package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u JOIN FETCH u.role WHERE u.email = :email")
    User findByEmail(@Param("email") String email);

    /**
     * Lấy tất cả users chưa bị xóa (isDeleted = false)
     */
    @Query("SELECT u FROM User u WHERE u.isDeleted = false")
    Page<User> findAllNotDeleted(Pageable pageable);

    /**
     * Tìm kiếm user theo email hoặc fullName
     * Chỉ lấy các user chưa bị xóa (isDeleted = false)
     * LOWER() để không phân biệt hoa thường
     * %keyword% để tìm kiếm có chứa từ khóa
     */
    @Query("SELECT u FROM User u WHERE u.isDeleted = false AND (" +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(u.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<User> searchUsers(@Param("keyword") String keyword, Pageable pageable);
}
