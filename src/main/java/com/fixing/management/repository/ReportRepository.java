package com.fixing.management.repository;

import com.fixing.management.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    Optional<List<Report>> findByAccountId(String accountId);

    List<Report> findByAssignedAccountId(String supervisorId);

    @Query("SELECT FUNCTION('MONTHNAME', r.updatedAt) AS monthName, COUNT(r.id) AS reportCount " +
            "FROM Report r " +
            "WHERE r.stage = 'resolved' AND FUNCTION('YEAR', r.updatedAt) = :year " +
            "GROUP BY FUNCTION('MONTHNAME', r.updatedAt) " +
            "ORDER BY FUNCTION('MONTH', r.updatedAt)")
    List<Object[]> getResolvedReportsByMonth(@Param("year") int year);

    @Query("SELECT r.assignedAccountId.id, AVG(r.feedbackRatings) " +
            "FROM Report r " +
            "WHERE r.stage = 'resolved' AND r.assignedAccountId IS NOT NULL AND r.feedbackRatings IS NOT NULL " +
            "GROUP BY r.assignedAccountId.id")
    List<Object[]> getAverageRatingBySupervisor();

    @Query("SELECT r.assignedAccountId.id, FUNCTION('MONTHNAME', r.updatedAt) AS monthName, COUNT(r.id) AS reportCount " +
            "FROM Report r " +
            "WHERE r.stage = 'DONE' AND r.assignedAccountId IS NOT NULL AND FUNCTION('YEAR', r.updatedAt) = :year " +
            "GROUP BY r.assignedAccountId.id, FUNCTION('MONTHNAME', r.updatedAt) " +
            "ORDER BY r.assignedAccountId.id, FUNCTION('MONTH', r.updatedAt)")
    List<Object[]> getReportCountBySupervisorAndMonth(@Param("year") int year);
}
