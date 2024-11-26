package com.fixing.management.repository;

import com.fixing.management.entity.Report;
import com.fixing.management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
    Optional<List<Report>> findByAccountId(String accountId);
}
