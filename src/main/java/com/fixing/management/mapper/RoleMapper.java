package com.fixing.management.mapper;

import com.fixing.management.dto.request.RoleRequest;
import com.fixing.management.dto.response.RoleResponse;
import com.fixing.management.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}
