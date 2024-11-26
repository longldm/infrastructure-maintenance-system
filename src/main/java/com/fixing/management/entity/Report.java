package com.fixing.management.entity;

import com.fixing.management.exception.AppException;
import com.fixing.management.exception.ErrorCode;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private User account;

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
    @Column(name = "stage", nullable = false, columnDefinition = "ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED') DEFAULT 'OPEN'")
    private Stage stage = Stage.OPEN;

    @OneToOne
    @JoinColumn(name = "assigned_account_id", nullable = true)
    private User assignedAccountId;

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

    public Report(User account, LectureHall lectureHall, String details, Priority priority, Boolean critical) {
        this.account = account;
        this.lectureHall = lectureHall;
        this.details = details;
        this.priority = priority;
        this.critical = critical;
    }
}

