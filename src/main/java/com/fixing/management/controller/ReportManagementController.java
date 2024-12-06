package com.fixing.management.controller;

import com.fixing.management.dto.request.ApiResponse;
import com.fixing.management.dto.request.ReportCreationRequest;
import com.fixing.management.dto.request.ReportNoteCreationRequest;
import com.fixing.management.dto.request.ReportUpdateRequest;
import com.fixing.management.dto.response.ReportNoteResponse;
import com.fixing.management.dto.response.ReportResponse;
import com.fixing.management.service.ReportService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/report_management")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ReportManagementController {

    ReportService reportService;

    @PostMapping
    ApiResponse<ReportResponse> createReport(@RequestBody @Valid ReportCreationRequest request) {
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.createReport(request))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<ReportResponse> getReport(@PathVariable int id) {
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.getReport(id))
                .build();
    }

    @GetMapping("/reporter")
    ApiResponse<List<ReportResponse>> getReportByAccountId(@RequestParam String accountId) {
        return ApiResponse.<List<ReportResponse>>builder()
                .result(reportService.getReportByAccountId(accountId))
                .build();
    }

    // update report
    @PutMapping("/assign-to")
    ApiResponse<ReportResponse> updateReport( @RequestBody @Valid ReportUpdateRequest request) {
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.updateReport(request))
                .build();
    }

    @PutMapping("/{id}/update-stage")  // Use the report ID as a path variable
    ApiResponse<ReportResponse> updateReportStage(
            @PathVariable("id") int id,  // Capture the report ID from the URL
            @RequestBody @Valid ReportUpdateRequest request) {  // Capture the stage change data from the request body

        // Set the report ID in the request DTO (if needed in the service)
        request.setId(id);

        // Call the service to update the report's stage
        return ApiResponse.<ReportResponse>builder()
                .result(reportService.updateReportStage(request))  // Call the service method
                .build();
    }



    @PostMapping("/{id}/add-note")
    ApiResponse<ReportNoteResponse> addNoteToReport(
            @PathVariable("id") int reportId,  // Capture the report ID from the URL
            @RequestBody @Valid ReportNoteCreationRequest request  // Capture the note details from the request body
    ) {
        // Extract the userId from the authenticated context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();  // Assume username represents userId

        // Call the service to add the note
        return ApiResponse.<ReportNoteResponse>builder()
                .result(reportService.addNoteToReport(reportId, request, userId))  // Call the service method
                .build();
    }

    @PostMapping("/assigned")
    ApiResponse<List<ReportResponse>> getReportsAssignedToMe() {
        // Extract the supervisorId (userId) from the JWT token
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String supervisorId = authentication.getName();  // Assuming username is the userId

        // Call the service to get the reports assigned to the supervisor
        List<ReportResponse> assignedReports = reportService.getReportsAssignedToSupervisor(supervisorId);

        // Return the response wrapped in ApiResponse
        return ApiResponse.<List<ReportResponse>>builder()
                .result(assignedReports)
                .build();
    }


}
