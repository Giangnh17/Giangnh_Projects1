package com.example.demo.repository;

import com.example.demo.entity.User;
import org.hibernate.query.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
