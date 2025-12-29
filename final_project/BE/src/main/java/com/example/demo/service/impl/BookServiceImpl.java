package com.example.demo.service.impl;

import com.example.demo.dto.request.CreateBookRequest;
import com.example.demo.dto.response.PageResponse;
import com.example.demo.entity.Book;
import com.example.demo.repository.BookRepository;
import com.example.demo.service.BookService;
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
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public ResponseEntity<?> getAllBooks(com.example.demo.dto.request.PageRequest pageRequest) {
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

            Page<Book> bookPage;

            // Kiểm tra nếu có search keyword thì dùng searchBooks, không thì findAllNotDeleted
            if (pageRequest.getSearch() != null && !pageRequest.getSearch().trim().isEmpty()) {
                // Có search keyword -> tìm kiếm theo title, author hoặc category (chỉ lấy book chưa xóa)
                bookPage = bookRepository.searchBooks(pageRequest.getSearch().trim(), pageable);
            } else {
                // Không có search keyword -> lấy tất cả books chưa bị xóa
                bookPage = bookRepository.findAllNotDeleted(pageable);
            }

            PageResponse<Book> pageResponse = new PageResponse<>(
                    bookPage.getContent(),
                    bookPage.getNumber(),
                    bookPage.getSize(),
                    bookPage.getTotalElements(),
                    bookPage.getTotalPages(),
                    bookPage.isLast(),
                    bookPage.isFirst()
            );

            return ResponseEntity.ok(pageResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving books: " + e.getMessage());
        }
    }


    @Override
    public ResponseEntity<?> createBook(CreateBookRequest request) {
        try {
            Book book = new Book();
            book.setTitle(request.getTitle());
            book.setAuthor(request.getAuthor());
            book.setCategory(request.getCategory());
            book.setStatus(request.getStatus() != null ? request.getStatus() : "AVAILABLE");

            Book savedBook = bookRepository.save(book);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error creating book: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> updateBook(Long id, CreateBookRequest request) {
        try {
            Optional<Book> bookOptional = bookRepository.findById(id);
            if (bookOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Book not found with id: " + id);
            }

            Book book = bookOptional.get();
            book.setTitle(request.getTitle());
            book.setAuthor(request.getAuthor());
            book.setCategory(request.getCategory());
            book.setStatus(request.getStatus());

            Book updatedBook = bookRepository.save(book);
            return ResponseEntity.ok(updatedBook);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error updating book: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> deleteBook(Long id) {
        try {
            Optional<Book> bookOptional = bookRepository.findById(id);
            if (bookOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Book not found with id: " + id);
            }

            bookRepository.deleteById(id);
            return ResponseEntity.ok("Book deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting book: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getBookById(Long id) {
        try {
            Optional<Book> bookOptional = bookRepository.findById(id);
            if (bookOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Book not found with id: " + id);
            }

            return ResponseEntity.ok(bookOptional.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving book: " + e.getMessage());
        }
    }
}
