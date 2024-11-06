package com.fixing.management.controller;

import com.fixing.management.dto.UserCreationRequest;
import com.fixing.management.entity.User;
import com.fixing.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    String sayHello() {
        return "Hello SpringBoot";
    }

    @PostMapping("/users")
    User createUser(@RequestBody UserCreationRequest request) {
        return userService.createUser(request);
    }
}
