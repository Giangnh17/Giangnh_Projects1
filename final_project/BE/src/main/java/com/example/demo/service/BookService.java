package com.example.demo.service;

import com.example.demo.dto.request.CreateBookRequest;
import org.springframework.http.ResponseEntity;


public interface BookService {
    ResponseEntity<?> getAllBooks(int page, int size);
    ResponseEntity<?> createBook(CreateBookRequest request);
    ResponseEntity<?> updateBook(Long id, CreateBookRequest request);
    ResponseEntity<?> deleteBook(Long id);
    ResponseEntity<?> getBookById(Long id);
}
