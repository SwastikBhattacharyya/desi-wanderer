package in.co.swastikbhattacharyya.projects.desiwanderer.image.dto;

import in.co.swastikbhattacharyya.projects.desiwanderer.validation.constraints.JsonNullableIsPresent;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Patch;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Update;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.valueextraction.Unwrapping;
import org.openapitools.jackson.nullable.JsonNullable;

public record ImagePayload(
    @JsonNullableIsPresent(
            message = "Title is required",
            payload = {Unwrapping.Skip.class},
            groups = {Update.class})
        JsonNullable<
                @NotBlank(
                    message = "Title cannot be empty",
                    groups = {Update.class, Patch.class})
                @Size(
                    message = "Title must contain between 2 and 60 characters",
                    groups = {Update.class, Patch.class},
                    min = 2,
                    max = 60)
                String>
            title,
    @JsonNullableIsPresent(
            message = "Alt Text is required",
            payload = {Unwrapping.Skip.class},
            groups = {Update.class})
        JsonNullable<
                @NotBlank(
                    message = "Alt Text cannot be empty",
                    groups = {Update.class, Patch.class})
                @Size(
                    message = "Alt must contain between 2 and 150 characters",
                    groups = {Update.class, Patch.class},
                    min = 2,
                    max = 150)
                String>
            altText) {}
