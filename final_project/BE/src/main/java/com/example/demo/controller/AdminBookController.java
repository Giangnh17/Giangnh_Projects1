package com.example.demo.controller;

import com.example.demo.dto.request.CreateBookRequest;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/product")
public class AdminBookController {

    @Autowired
    private BookService bookService;

    @PostMapping()
    public ResponseEntity<?> products(@RequestBody CreateBookRequest request) {
        return bookService.createBook(request);
    }
}
