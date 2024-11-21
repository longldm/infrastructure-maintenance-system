package com.fixing.management.dto;

import com.fixing.management.entity.Account;

import java.util.Locale;

public class AccountRequest {
    private String username;
    private String email;
    private String password;
    private String role; // "user" or "manager"

    // Getters and Setters

    public AccountRequest(String username, String email, String password, String role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Account.Role getRole() {
        if (role.toLowerCase(Locale.ROOT).equals(Account.Role.MANAGER.name().toLowerCase(Locale.ROOT)))
            return Account.Role.MANAGER;
        else
            return Account.Role.USER;
    }

    public void setRole(String role) {
        this.role = role;
    }
}