package com.fixing.management.repository;

import com.fixing.management.entity.ReportNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportNoteRepository extends JpaRepository<ReportNote, Integer> {

    // Retrieve all notes associated with a specific report
    List<ReportNote> findByReportId(Integer reportId);
}
