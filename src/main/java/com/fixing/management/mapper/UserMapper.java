package com.fixing.management.mapper;

import com.fixing.management.dto.request.UserCreationRequest;
import com.fixing.management.dto.request.UserUpdateRequest;
import com.fixing.management.dto.response.UserResponse;
import com.fixing.management.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;



@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
