package com.example.demo.controller;

import com.example.demo.dto.request.CreateBookRequest;
import com.example.demo.dto.request.PageRequest;
import com.example.demo.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    // GET /api/books - Lấy danh sách tất cả sách (Public - tất cả user có thể xem)
    @GetMapping
    public ResponseEntity<?> getAllBooks(@ModelAttribute PageRequest pageRequest) {
        return bookService.getAllBooks(pageRequest);
    }

    // GET /api/books/{id} - Lấy thông tin sách theo ID (Public - tất cả user có thể xem)
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    // POST /api/books - Tạo sách mới (chỉ Librarian/Admin)
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    public ResponseEntity<?> createBook(@RequestBody @Valid CreateBookRequest request) {
        return bookService.createBook(request);
    }

    // PUT /api/books/{id} - Cập nhật thông tin sách (chỉ Librarian/Admin)
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody @Valid CreateBookRequest request) {
        return bookService.updateBook(id, request);
    }

    // DELETE /api/books/{id} - Xóa sách (chỉ Admin/Librarian)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'LIBRARIAN')")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        return bookService.deleteBook(id);
    }
}
