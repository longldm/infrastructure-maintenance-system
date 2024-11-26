package com.fixing.management.service;

import com.fixing.management.dto.request.ReportCreationRequest;
import com.fixing.management.dto.response.ReportResponse;
import com.fixing.management.entity.LectureHall;
import com.fixing.management.entity.Report;
import com.fixing.management.entity.User;
import com.fixing.management.exception.AppException;
import com.fixing.management.exception.ErrorCode;
import com.fixing.management.mapper.ReportMapper;
import com.fixing.management.repository.LectureHallRepository;
import com.fixing.management.repository.ReportRepository;
import com.fixing.management.repository.UserRepository;
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

    public ReportResponse createReport(ReportCreationRequest request) {
        User user = userRepository.findById(request.getAccountId())
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
}
