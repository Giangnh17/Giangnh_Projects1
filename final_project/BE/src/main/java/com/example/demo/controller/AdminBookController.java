package com.example.demo.controller;

import com.example.demo.dto.request.CreateBookRequest;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/books")
@CrossOrigin(origins = "*")
public class AdminBookController {

    @Autowired
    private BookService bookService;

    @PostMapping()
    public ResponseEntity<?> products(@RequestBody CreateBookRequest request) {
        return bookService.createBook(request);
    }
}
