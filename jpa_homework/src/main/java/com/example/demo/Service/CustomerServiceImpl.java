package com.example.demo.Service;

import com.example.demo.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// có thể Autowired trong Repo hoặc sử dụng cái dưới
// @RequiredArgsConstructor
@Service
public class CustomerServiceImpl {
    @Autowired
    private CustomerRepository customerRepository;

}
