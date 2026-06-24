package in.co.swastikbhattacharyya.projects.desiwanderer.image.dto;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.validation.constraints.ValidImage;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record ImageUploadPayload(
    @ValidImage MultipartFile file,
    @NotBlank(message = "Title is required")
        @Size(message = "Title must contain between 2 and 60 characters", min = 2, max = 60)
        String title,
    @NotBlank(message = "Alt Text is required")
        @Size(message = "Alt Text must contain between 2 and 150 characters", min = 2, max = 150)
        String altText) {}
