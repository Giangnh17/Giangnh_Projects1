package com.example.demo.service.impl;

import com.example.demo.dto.request.CreateBookRequest;
import com.example.demo.entity.Book;
import com.example.demo.repository.BookRepository;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public ResponseEntity<?> getAllBooks() {
        try {
            List<Book> books = bookRepository.findAll();
            return ResponseEntity.ok(books);
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
