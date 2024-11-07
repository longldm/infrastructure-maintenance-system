package com.fixing.management.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

/**
 * Explanation:
 *
 *     @Entity: Marks the class as an entity mapped to a database table.
 *     @Table: Specifies the table name in the database (in this case, "users").
 *     @Id and @GeneratedValue: Defines the primary key and auto-generates its value.
 *     @Column: Maps each field to a column in the table and specifies details like nullable, length, and columnDefinition.
 *     @Enumerated(EnumType.STRING): Maps the Role enum as a string in the database.
 *     LocalDateTime: Used for createdAt and updatedAt fields to store timestamps.
 *
 *     Make sure to handle updatedAt updates in your service layer or by using an @PreUpdate annotation for automatic timestamp updates in the entity if needed.
 */
@Table(name = "accounts")
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "username", nullable = false, length = 255)
    private String username;

    @Column(name = "email", nullable = false, length = 255, unique = true)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "created_log", length = 255, columnDefinition = "NVARCHAR(255) DEFAULT 'Admin'")
    private String createdLog = "Admin";

    @Column(name = "created_by", length = 255, columnDefinition = "NVARCHAR(255) DEFAULT 'Admin'")
    private String createdBy = "Admin";

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "updated_log", length = 255, columnDefinition = "NVARCHAR(255) DEFAULT 'Admin'")
    private String updatedLog = "Admin";

    @Column(name = "updated_by", length = 255, columnDefinition = "NVARCHAR(255) DEFAULT 'Admin'")
    private String updatedBy = "Admin";

    // Constructors, getters, and setters
    public enum Role {
        USER, MANAGER
    }

    // Default constructor
    public Account() {
    }

    // Constructor with fields
    public Account(String username, String email, String password, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getCreatedLog() {
        return createdLog;
    }

    public void setCreatedLog(String createdLog) {
        this.createdLog = createdLog;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getUpdatedLog() {
        return updatedLog;
    }

    public void setUpdatedLog(String updatedLog) {
        this.updatedLog = updatedLog;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
}
