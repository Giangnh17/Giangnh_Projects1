package com.example.demo.repository;

import com.example.demo.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    Book save(Book book);

    Optional<Book> findById(Long id);

    void deleteById(Long id);

    List<Book> findAll();

    /**
     * Lấy tất cả books chưa bị xóa (isDeleted = false)
     */
    @Query("SELECT b FROM Book b WHERE b.isDeleted = false")
    Page<Book> findAllNotDeleted(Pageable pageable);

    /**
     * Tìm kiếm sách theo title, author hoặc category
     * Chỉ lấy các book chưa bị xóa (isDeleted = false)
     * LOWER() để không phân biệt hoa thường
     * %keyword% để tìm kiếm có chứa từ khóa
     */
    @Query("SELECT b FROM Book b WHERE b.isDeleted = false AND (" +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.category) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Book> searchBooks(@Param("keyword") String keyword, Pageable pageable);

    /**
     * Dashboard Statistics Queries
     * Các query để lấy thống kê cho dashboard
     */

    // Đếm tổng số sách chưa bị xóa
    @Query("SELECT COUNT(b) FROM Book b WHERE b.isDeleted = false")
    long countTotalBooks();

    // Đếm số sách theo status cụ thể
    @Query("SELECT COUNT(b) FROM Book b WHERE b.isDeleted = false AND b.status = :status")
    long countByStatus(@Param("status") String status);

    // Đếm số sách theo category (trả về danh sách category và count)
    @Query("SELECT b.category, COUNT(b) FROM Book b WHERE b.isDeleted = false GROUP BY b.category")
    List<Object[]> countByCategory();

    // Đếm số sách theo status (trả về danh sách status và count) - cho pie chart
    @Query("SELECT b.status, COUNT(b) FROM Book b WHERE b.isDeleted = false GROUP BY b.status")
    List<Object[]> countByStatusGroup();
}
