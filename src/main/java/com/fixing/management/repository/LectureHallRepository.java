package com.fixing.management.repository;

import com.fixing.management.entity.LectureHall;
import com.fixing.management.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LectureHallRepository extends JpaRepository<LectureHall, Integer> {
}
