package in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto;

import in.co.swastikbhattacharyya.projects.desiwanderer.validation.constraints.JsonNullableIsPresent;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Create;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Update;
import jakarta.validation.valueextraction.Unwrapping;
import java.util.UUID;
import org.openapitools.jackson.nullable.JsonNullable;

public record CommentPayload(
    @JsonNullableIsPresent(
            message = "Post ID is required",
            payload = {Unwrapping.Skip.class},
            groups = {Create.class, Update.class})
        JsonNullable<UUID> postId,
    @JsonNullableIsPresent(
            message = "Content is required",
            payload = {Unwrapping.Skip.class},
            groups = {Create.class, Update.class})
        JsonNullable<String> content,
    @JsonNullableIsPresent(
            message = "Is Approved is required",
            payload = {Unwrapping.Skip.class},
            groups = {Create.class, Update.class})
        JsonNullable<Boolean> isApproved) {}
