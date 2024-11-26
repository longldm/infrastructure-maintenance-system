package com.fixing.management.mapper;

import com.fixing.management.dto.request.ReportCreationRequest;
import com.fixing.management.dto.request.ReportUpdateRequest;
import com.fixing.management.dto.request.UserCreationRequest;
import com.fixing.management.dto.request.UserUpdateRequest;
import com.fixing.management.dto.response.ReportResponse;
import com.fixing.management.dto.response.UserResponse;
import com.fixing.management.entity.Report;
import com.fixing.management.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;


@Mapper(componentModel = "spring")
public interface ReportMapper {
    Report toReport(ReportCreationRequest request);

    @Mapping(source = "account.id", target = "reporterId") // Map the account's ID to accountId
    @Mapping(source = "assignedAccountId.id", target = "assignedSupervisorId") // Map the account's ID to accountId
    ReportResponse toReportResponse(Report report);

    @Mapping(source = "account.id", target = "accountId") // Map the account's ID to accountId
    List<ReportResponse> toReportResponseList(List<Report> reports);

    @Mapping(target = "account", ignore = true)
    void updateReport(@MappingTarget Report report, ReportUpdateRequest request);
}
