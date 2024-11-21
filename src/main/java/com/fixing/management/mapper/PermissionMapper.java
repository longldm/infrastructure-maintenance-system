package com.fixing.management.mapper;

import com.fixing.management.dto.request.PermissionRequest;
import com.fixing.management.dto.response.PermissionResponse;
import com.fixing.management.entity.Permission;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
