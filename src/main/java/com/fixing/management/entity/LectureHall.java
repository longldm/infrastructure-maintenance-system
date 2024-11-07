package com.fixing.management.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lecture_hall")
public class LectureHall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "building", nullable = false, length = 255)
    private String building;

    @Column(name = "floor", nullable = false, length = 255)
    private String floor;

    @Column(name = "room", nullable = false, length = 255)
    private String room;

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

    // Default constructor
    public LectureHall() {
    }

    // Constructor with fields
    public LectureHall(String building, String floor, String room) {
        this.building = building;
        this.floor = floor;
        this.room = room;
    }

    // Getters and setters
    // ...


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
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

