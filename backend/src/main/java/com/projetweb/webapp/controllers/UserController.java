package com.projetweb.webapp.controllers;


import com.projetweb.webapp.services.UserService;
import org.springframework.web.bind.annotation.*;
import com.projetweb.webapp.entities.User;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // CREATE USER
    @PostMapping
    public User createUser(@RequestBody User user,
                           @RequestParam String role) {
        return userService.createUser(user, role);
    }

    // GET ALL USERS
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // UPDATE USER
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id,
                           @RequestBody User user,
                           @RequestParam String role) {
        return userService.updateUser(id, user, role);
    }

    // DELETE USER
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
