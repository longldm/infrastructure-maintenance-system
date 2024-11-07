package com.fixing.management.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "report_note")
public class ReportNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
    private Report report;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "details", nullable = false, length = 255)
    private String details;

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

    public ReportNote() {
    }

    public ReportNote(String name, String details, Report report, Account account) {
        this.name = name;
        this.details = details;
        this.report = report;
        this.account = account;
    }

    // Getters and setters
    // ...

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
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

