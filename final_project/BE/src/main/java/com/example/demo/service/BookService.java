package com.example.demo.service;

import com.example.demo.dto.request.CreateBookRequest;
import com.example.demo.entity.Book;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BookService {
    ResponseEntity<?> getAllBooks();
    ResponseEntity<?> createBook(CreateBookRequest request);
    ResponseEntity<?> updateBook(Long id, CreateBookRequest request);
    ResponseEntity<?> deleteBook(Long id);
    ResponseEntity<?> getBookById(Long id);
}
