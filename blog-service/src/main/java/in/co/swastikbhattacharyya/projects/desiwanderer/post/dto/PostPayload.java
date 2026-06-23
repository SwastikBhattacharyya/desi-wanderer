package in.co.swastikbhattacharyya.projects.desiwanderer.post.dto;

import in.co.swastikbhattacharyya.projects.desiwanderer.validation.constraints.JsonNullableIsPresent;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Create;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Patch;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Update;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.valueextraction.Unwrapping;
import org.openapitools.jackson.nullable.JsonNullable;

public record PostPayload(
    @JsonNullableIsPresent(
            message = "Slug is required",
            payload = {Unwrapping.Skip.class},
            groups = {Create.class, Update.class})
        JsonNullable<
                @NotBlank(
                    message = "Slug cannot be empty",
                    groups = {Create.class, Update.class, Patch.class})
                @Size(
                    message = "Slug must contain between 2 and 60 characters",
                    groups = {Create.class, Update.class, Patch.class},
                    min = 2,
                    max = 60)
                String>
            slug,
    @JsonNullableIsPresent(
            message = "Title is required",
            payload = {Unwrapping.Skip.class},
            groups = {Create.class, Update.class})
        JsonNullable<
                @NotBlank(
                    message = "Title cannot be empty",
                    groups = {Create.class, Update.class, Patch.class})
                @Size(
                    message = "Title must contain between 2 and 60 characters",
                    groups = {Create.class, Update.class, Patch.class},
                    min = 2,
                    max = 60)
                String>
            title,
    @JsonNullableIsPresent(
            message = "Description is required",
            payload = {Unwrapping.Skip.class},
            groups = {Create.class, Update.class})
        JsonNullable<
                @NotBlank(
                    message = "Description cannot be empty",
                    groups = {Create.class, Update.class, Patch.class})
                @Size(
                    message = "Description must contain between 2 and 150 characters",
                    groups = {Create.class, Update.class, Patch.class},
                    min = 2,
                    max = 150)
                String>
            description,
    @JsonNullableIsPresent(
            message = "Content is required",
            payload = {Unwrapping.Skip.class},
            groups = {Create.class, Update.class})
        JsonNullable<String> content,
    @JsonNullableIsPresent(
            message = "Is Published is required",
            payload = {Unwrapping.Skip.class},
            groups = {Create.class, Update.class})
        JsonNullable<Boolean> isPublished,
    @JsonNullableIsPresent(
            message = "Is Approved is required",
            payload = {Unwrapping.Skip.class},
            groups = {Create.class, Update.class})
        JsonNullable<Boolean> isApproved) {}
