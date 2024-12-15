package com.fixing.management.service;

import com.fixing.management.dto.request.ReportCreationRequest;
import com.fixing.management.dto.request.ReportNoteCreationRequest;
import com.fixing.management.dto.request.ReportUpdateRequest;
import com.fixing.management.dto.response.*;
import com.fixing.management.entity.LectureHall;
import com.fixing.management.entity.Report;
import com.fixing.management.entity.ReportNote;
import com.fixing.management.entity.User;
import com.fixing.management.exception.AppException;
import com.fixing.management.exception.ErrorCode;
import com.fixing.management.mapper.ReportMapper;
import com.fixing.management.repository.LectureHallRepository;
import com.fixing.management.repository.ReportNoteRepository;
import com.fixing.management.repository.ReportRepository;
import com.fixing.management.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ReportService {
    ReportRepository reportRepository;
    UserRepository userRepository;
    ReportMapper reportMapper;
    LectureHallRepository lectureHallRepository;
    ReportNoteRepository reportNoteRepository;

    public ReportResponse createReport(ReportCreationRequest request) {
        User user = userRepository.findById(request.getReporterId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        LectureHall lectureHall = lectureHallRepository.findById(request.getLectureHall().getId())
                .orElse(
                        // create and save new lecture hall
                        lectureHallRepository.save(request.getLectureHall())
                );
        Report report = reportMapper.toReport(request);
        report.setAccount(user);
        report.setLectureHall(lectureHall);

        try {
            reportRepository.save(report);
            log.info("Report created: {}" + report);
        } catch (Exception e) {
            log.error("Error creating report: {}" + e.getMessage());
            throw e;
        }

        return reportMapper.toReportResponse(report);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'REPORTER_ROLE')")
    public ReportResponse getReport(int id) {
        return reportMapper.toReportResponse(
                reportRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.REPORT_NOT_FOUND))
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'REPORTER_ROLE')")
    public List<ReportResponse> getReportByAccountId(String userId) {
        List<Report> reports = reportRepository.findByAccountId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_NOT_FOUND));
        return reportMapper.toReportResponseList(reports);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ReportResponse updateReport(@Valid ReportUpdateRequest request) {
        Report report = reportRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_NOT_FOUND));

        User supervisor = userRepository.findById(request.getAssignedSupervisorId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        report.setUpdatedAt(LocalDateTime.now());
        report.setAssignedAccountId(supervisor);
        reportMapper.updateReport(report, request);

        try {
            reportRepository.save(report);
            log.info("Report updated: {}" + report);
        } catch (Exception e) {
            log.error("Error updating report: {}" + e.getMessage());
            throw e;
        }

        return reportMapper.toReportResponse(report);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'REPORTER', 'SUPERVISOR')")
    public ReportResponse updateReportStage(@Valid ReportUpdateRequest request) {
        // Find the report by ID
        Report report = reportRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_NOT_FOUND));

        // Get the current stage and requested new stage
        Report.Stage currentStage = report.getStage();
        Report.Stage newStage = request.getStage();

        // If the stage is already the same, there's no need to update
        if (currentStage == newStage) {
            log.info("No change in stage. Report {} is already in the {} stage.", report.getId(), currentStage);
            return reportMapper.toReportResponse(report); // No changes made, return the same report
        }

        // Ensure the new stage is valid
        if (newStage == null || !isValidStage(newStage.name())) {
            throw new AppException(ErrorCode.INVALID_STAGE_TRANSITION);
        }

        // Update the stage to the new stage
        report.setStage(newStage);
        report.setUpdatedAt(LocalDateTime.now());

        // Save the updated report
        try {
            reportRepository.save(report);
            log.info("Report stage updated: {} to {}", report.getId(), report.getStage());
        } catch (Exception e) {
            log.error("Error updating report stage: {}", e.getMessage());
            throw new AppException(ErrorCode.DATABASE_ERROR);
        }

        // Return the updated report response
        return reportMapper.toReportResponse(report);
    }

    private boolean isValidStage(String stageName) {
        try {
            // Try to parse the stage name into the corresponding enum
            Report.Stage.valueOf(stageName);
            return true; // If parsing is successful, the stage is valid
        } catch (IllegalArgumentException e) {
            return false; // If the value is invalid, an exception will be thrown
        }
    }


    public List<ReportResponse> getReportsAssignedToSupervisor(String supervisorId) {
        // Fetch the user (supervisor) by accountId
        User supervisor = userRepository.findById(supervisorId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Ensure the user has the 'SUPERVISOR' role
        if (!supervisorHasRoleSupervisor(supervisor)) {
            throw new AppException(ErrorCode.UNAUTHORIZED_USER);  // Or ErrorCode.FORBIDDEN
        }

        // Fetch all reports assigned to the supervisor (by assignedAccountId)
        List<Report> reports = reportRepository.findByAssignedAccountId(supervisorId);

        // Map the list of reports to ReportResponse
        return reports.stream()
                .map(this::toReportResponse)  // Convert each Report to ReportResponse
                .collect(Collectors.toList());
    }


    private boolean supervisorHasRoleSupervisor(User supervisor) {
        // Check if the supervisor has the 'SUPERVISOR' role
        return supervisor.getRoles().stream()
                .anyMatch(role -> role.getName().equals("ROLE_SUPERVISOR"));
    }

    private ReportResponse toReportResponse(Report report) {
        // Map Report entity to ReportResponse DTO
        return new ReportResponse(
                String.valueOf(report.getId()),  // Convert report id to String
                report.getAccount().getId(),  // Reporter ID
                report.getAssignedAccountId() != null ? report.getAssignedAccountId().getId() : null,  // Assigned supervisor ID
                report.getLectureHall(),  // Lecture hall information
                report.getDetails(),  // Report details
                report.getPriority(),  // Report priority
                report.getCritical(),  // Critical status
                report.getStage(),  // Report stage
                report.getCreatedAt(),  // Report creation timestamp
                report.getUpdatedAt()
        );
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'REPORTER')")
    public ReportNoteResponse addNoteToReport(int reportId, ReportNoteCreationRequest request, String userId) {
        // Find the report by ID
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_NOT_FOUND));

        // Find the user by their ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Create a new report note
        ReportNote note = new ReportNote();
        note.setReport(report);  // Associate the note with the report
        note.setDetails(request.getDetails());  // Set the content of the note
        note.setAccount(user);  // Set the user who created the note

        // Save the note to the database
        ReportNote savedNote = reportNoteRepository.save(note);

        // Return the created note as a response
        return new ReportNoteResponse(
                report.getId(),
                savedNote.getDetails(),
                savedNote.getCreatedAt(),
                user.getUsername()  // Use username or any preferred user identifier
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")  // Ensure only Admin or Manager can access this
    public List<ReportResponse> getAllReports(String accountId) {
        // Fetch the user by accountId to validate the role
        User user = userRepository.findById(accountId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Check if the user has the required role (ADMIN or MANAGER)
        if (!userHasValidRole(user)) {
            throw new AppException(ErrorCode.UNAUTHORIZED_USER);  // Or ErrorCode.FORBIDDEN depending on your choice
        }

        // Fetch all reports from the database
        List<Report> reports = reportRepository.findAll();

        // Map the list of reports to ReportResponse
        return reports.stream()
                .map(this::toReportResponse)  // Convert each Report to ReportResponse
                .collect(Collectors.toList());
    }

    // Helper method to check if the user has the correct roles
    private boolean userHasValidRole(User user) {
        return user.getRoles().stream()
                .anyMatch(role -> role.getName().equals("ADMIN") || role.getName().equals("MANAGER"));
    }


    public ReportsResolvedByMonthResponse getResolvedReportsByMonth(int year) {
        // Fetch raw data from the repository
        List<Object[]> rawResults = reportRepository.getResolvedReportsByMonth(year);
        log.info("Raw results: {}", rawResults);

        // Convert the raw data into a Map<String, Integer>
        Map<String, Integer> monthlyCounts = rawResults.stream()
                .collect(Collectors.toMap(
                        result -> (String) result[0],  // Month name
                        result -> ((Number) result[1]).intValue()  // Report count
                ));

        // Return the formatted response
        return new ReportsResolvedByMonthResponse(monthlyCounts);
    }

    public ReportsAverageRatingResponse getAverageRatingBySupervisor() {
        // Fetch raw data from the repository
        List<Object[]> rawResults = reportRepository.getAverageRatingBySupervisor();

        // Process the raw data into a list of SupervisorRatingResponse
        List<SupervisorRatingResponse> supervisorRatings = rawResults.stream()
                .map(result -> new SupervisorRatingResponse(
                        (String) result[0], // Supervisor ID
                        (Double) result[1]   // Average rating
                ))
                .collect(Collectors.toList());

        // Return the result wrapped in the response DTO
        return new ReportsAverageRatingResponse(supervisorRatings);
    }


    public ReportsProcessedBySupervisorResponse getReportCountBySupervisorAndMonth(int year) {
        log.info("Fetching report counts by supervisor and month for year: {}", year);
        // Fetch raw data from the repository (only DONE reports)
        List<Object[]> rawResults = reportRepository.getReportCountBySupervisorAndMonth(year);

        // Process the raw data into a map (supervisor ID -> Map<month, count>)
        Map<String, Map<String, Integer>> supervisorMonthlyReportCounts = new HashMap<>();

        for (Object[] result : rawResults) {
            String supervisorId = (String) result[0];  // Supervisor ID
            String monthName = (String) result[1];     // Month name (e.g., "January")
            Integer reportCount = ((Number) result[2]).intValue();  // Report count

            // Initialize the map for the supervisor if it doesn't exist
            supervisorMonthlyReportCounts
                    .computeIfAbsent(supervisorId, k -> new HashMap<>())
                    .put(monthName, reportCount);
        }

        // Map the data into the response DTO
        List<SupervisorMonthlyReportCount> supervisorReportCounts = supervisorMonthlyReportCounts.entrySet().stream()
                .map(entry -> new SupervisorMonthlyReportCount(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());

        return new ReportsProcessedBySupervisorResponse(supervisorReportCounts);
    }




}





