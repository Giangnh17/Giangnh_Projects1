package com.example.demo.controller;

import com.example.demo.dto.request.CreateBookRequest;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookService bookService;

    // GET /api/books - Lấy danh sách tất cả sách
    @GetMapping
    public ResponseEntity<?> getAllBooks() {
        return bookService.getAllBooks();
    }

    // GET /api/books/{id} - Lấy thông tin sách theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    // POST /api/books - Tạo sách mới (chỉ Librarian/Admin)
    @PostMapping
    public ResponseEntity<?> createBook(@RequestBody CreateBookRequest request) {
        return bookService.createBook(request);
    }

    // PUT /api/books/{id} - Cập nhật thông tin sách (chỉ Librarian/Admin)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody CreateBookRequest request) {
        return bookService.updateBook(id, request);
    }

    // DELETE /api/books/{id} - Xóa sách (chỉ Admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        return bookService.deleteBook(id);
    }
}
