package com.fixing.management.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @ManyToOne
    @JoinColumn(name = "lecture_hall_id", nullable = false)
    private LectureHall lectureHall;

    @Column(name = "details", nullable = false, length = 255)
    private String details;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private Priority priority;

    @Column(name = "critical", nullable = false)
    private Boolean critical;

    @Enumerated(EnumType.STRING)
    @Column(name = "stage", nullable = false, columnDefinition = "ENUM('open', 'in_progress', 'resolved') DEFAULT 'open'")
    private Stage stage = Stage.OPEN;

    @Column(name = "assigned_account_id")
    private Integer assignedAccountId;

    @Column(name = "feedback_ratings", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer feedbackRatings = 0;

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

    // Enums for priority and stage
    public enum Priority {
        LOW, MEDIUM, HIGH
    }

    public enum Stage {
        OPEN, IN_PROGRESS, RESOLVED
    }

    // Constructors, getters, and setters

    public Report() {
    }

    public Report(Account account, LectureHall lectureHall, String details, Priority priority, Boolean critical) {
        this.account = account;
        this.lectureHall = lectureHall;
        this.details = details;
        this.priority = priority;
        this.critical = critical;
    }

    // Getters and setters
    // ...

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public LectureHall getLectureHall() {
        return lectureHall;
    }

    public void setLectureHall(LectureHall lectureHall) {
        this.lectureHall = lectureHall;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Boolean getCritical() {
        return critical;
    }

    public void setCritical(Boolean critical) {
        this.critical = critical;
    }

    public Stage getStage() {
        return stage;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }

    public Integer getAssignedAccountId() {
        return assignedAccountId;
    }

    public void setAssignedAccountId(Integer assignedAccountId) {
        this.assignedAccountId = assignedAccountId;
    }

    public Integer getFeedbackRatings() {
        return feedbackRatings;
    }

    public void setFeedbackRatings(Integer feedbackRatings) {
        this.feedbackRatings = feedbackRatings;
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

