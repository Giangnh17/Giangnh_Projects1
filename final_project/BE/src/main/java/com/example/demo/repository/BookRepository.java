package com.example.demo.repository;

import com.example.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    Book save(Book book);

    Optional<Book> findById(Long id);

    void deleteById(Long id);

    List<Book> findAll();
}
