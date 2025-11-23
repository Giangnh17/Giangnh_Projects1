package com.example.demo.service;

import com.example.demo.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service   //Đánh dấu class này là một Spring Bean (thành phần được Spring quản lý).
           //Nhờ annotation này, UserController mới có thể @Autowired được nó.
public class UserServiceImpl implements UserService{
    private List<User> mockUsers = new ArrayList<>(
            List.of(
            new User("1", "Nguyen Van A", 18),
            new User("2", "Nguyen N", 19),
            new User("3", "Hoang Mai", 20),
            new User("4", "BBB", 18)
            )
    );

    @Override
    public List<User> getListUser(String name) {
        return mockUsers.stream().filter(u -> u.getName().contains(name)).toList();
    }

    @Override
    public User getById(String id) {
        return mockUsers.stream().filter(u -> u.getId().equals(id)).findFirst().get();
    }
}
