package com.example.demo.service;

import com.example.demo.dto.request.CreateBookRequest;
import com.example.demo.dto.request.PageRequest;
import org.springframework.http.ResponseEntity;


public interface BookService {
    ResponseEntity<?> getAllBooks(PageRequest pageRequest);
    ResponseEntity<?> createBook(CreateBookRequest request);
    ResponseEntity<?> updateBook(Long id, CreateBookRequest request);
    ResponseEntity<?> deleteBook(Long id);
    ResponseEntity<?> getBookById(Long id);
}
