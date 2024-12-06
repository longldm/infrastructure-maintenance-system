package com.fixing.management.service;

import com.fixing.management.dto.request.ReportCreationRequest;
import com.fixing.management.dto.request.ReportNoteCreationRequest;
import com.fixing.management.dto.request.ReportUpdateRequest;
import com.fixing.management.dto.response.ReportNoteResponse;
import com.fixing.management.dto.response.ReportResponse;
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

import java.util.List;

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

        // Check if the current user is allowed to update the stage (reporter or supervisor)
        if (!isUserAllowedToUpdateStage(report, request.getAssignedSupervisorId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED_USER);
        }

        // Get the current stage and requested new stage
        Report.Stage currentStage = report.getStage();
        Report.Stage newStage = request.getStage();

        // If the stage is already the same, there's no need to update
        if (currentStage == newStage) {
            log.info("No change in stage. Report {} is already in the {} stage.", report.getId(), currentStage);
            return reportMapper.toReportResponse(report); // No changes made, return the same report
        }

        // Since we're allowing all valid stage transitions, we simply ensure the new stage is valid
        if (newStage == null || !isValidStage(newStage.name())) {
            throw new AppException(ErrorCode.INVALID_STAGE_TRANSITION);
        }

        // Update the stage to the new stage
        report.setStage(newStage);

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

    private boolean isUserAllowedToUpdateStage(Report report, String userId) {
        // Check if the user is either the reporter or the assigned supervisor
        return report.getAccount().getId().equals(userId) ||
                (report.getAssignedAccountId() != null && report.getAssignedAccountId().getId().equals(userId));
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

    @PreAuthorize("hasRole('SUPERVISOR')")
    public List<ReportResponse> getReportsAssignedToSupervisor(String userId) {
        // Fetch all reports assigned to the supervisor
        List<Report> reports = reportRepository.findByAccountId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_NOT_FOUND));

        // Convert the reports to the response format
        return reportMapper.toReportResponseList(reports);
    }


}





