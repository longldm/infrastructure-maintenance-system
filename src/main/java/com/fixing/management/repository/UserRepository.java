package com.fixing.management.repository;

import java.util.List;
import java.util.Optional;

import com.fixing.management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);

    @Query("SELECT u.id FROM User u JOIN u.roles r WHERE r.name = 'ROLE_SUPERVISOR'")
    List<String> findSupervisors();
}
