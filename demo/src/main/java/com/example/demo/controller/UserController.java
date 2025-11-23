package com.example.demo.controller;

import com.example.demo.dto.UserCreateRequest;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController //Đánh dấu class này là một Controller chuyên xử lý REST API
//Dữ liệu trả về sẽ tự động được đóng gói thành JSON (thay vì trả về giao diện HTML)
@RequestMapping("/user") //Định nghĩa đường dẫn gốc. Tất cả API trong class này sẽ bắt đầu bằng /user.
    public class UserController {

        @Autowired
        private UserService userService;

        @GetMapping
        public List<User> getUsers(@RequestParam("name") String name){
            return userService.getListUser(name);
        }

        // @GetMapping("/search")

        @GetMapping("/{id}")
        public User getUserById(@PathVariable String id) {
            return userService.getById(id);
        }
    }

    @PostMapping
    public User createUser(@RequestBody UserCreateRequest userCreateRequest) {
        System.out.println(userCreateRequest);
        return null;
    }
}
