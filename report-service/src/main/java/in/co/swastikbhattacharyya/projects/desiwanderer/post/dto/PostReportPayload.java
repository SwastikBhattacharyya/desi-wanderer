package in.co.swastikbhattacharyya.projects.desiwanderer.post.dto;

import in.co.swastikbhattacharyya.projects.desiwanderer.validation.constraints.JsonNullableIsPresent;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Create;
import jakarta.validation.valueextraction.Unwrapping;
import java.util.UUID;
import org.openapitools.jackson.nullable.JsonNullable;

public record PostReportPayload(
    @JsonNullableIsPresent(
            message = "Post ID is required",
            payload = {Unwrapping.Skip.class},
            groups = {Create.class})
        JsonNullable<UUID> postId) {}
