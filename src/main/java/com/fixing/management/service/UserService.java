package com.fixing.management.service;

import java.util.HashSet;
import java.util.List;

import com.fixing.management.constant.PredefinedRole;
import com.fixing.management.dto.request.UserCreationRequest;
import com.fixing.management.dto.request.UserUpdateRequest;
import com.fixing.management.dto.response.UserResponse;
import com.fixing.management.entity.Role;
import com.fixing.management.entity.User;
import com.fixing.management.exception.AppException;
import com.fixing.management.exception.ErrorCode;
import com.fixing.management.mapper.UserMapper;
import com.fixing.management.repository.RoleRepository;
import com.fixing.management.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreationRequest request) {
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<Role> roles = new HashSet<>();
        switch (request.getRole()) {
            case PredefinedRole.ADMIN_ROLE:
                roleRepository.findById(PredefinedRole.ADMIN_ROLE).ifPresent(roles::add);
                user.setRoles(roles);
                break;
            case PredefinedRole.USER_ROLE:
                roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
                user.setRoles(roles);
                break;
            case PredefinedRole.MANAGER_ROLE:
                roleRepository.findById(PredefinedRole.MANAGER_ROLE).ifPresent(roles::add);
                user.setRoles(roles);
                break;
            case PredefinedRole.SUPERVISOR_ROLE:
                roleRepository.findById(PredefinedRole.SUPERVISOR_ROLE).ifPresent(roles::add);
                user.setRoles(roles);
                break;
            case PredefinedRole.REPORTER_ROLE:
                roleRepository.findById(PredefinedRole.REPORTER_ROLE).ifPresent(roles::add);
                user.setRoles(roles);
                break;
        }

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return userMapper.toUserResponse(user);
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userMapper.updateUser(user, request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        var roles = roleRepository.findAllById(request.getRoles());
        user.setRoles(new HashSet<>(roles));

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        log.info("In method get Users");
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse getUser(String id) {
        return userMapper.toUserResponse(
                userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }
}
