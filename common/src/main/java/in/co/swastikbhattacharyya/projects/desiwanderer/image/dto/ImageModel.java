package in.co.swastikbhattacharyya.projects.desiwanderer.image.dto;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.domain.ImageDomain;
import java.time.Instant;
import java.util.UUID;

public record ImageModel(
    UUID id,
    String fileName,
    UUID key,
    String mimeType,
    String title,
    String altText,
    Integer width,
    Integer height,
    UUID ownerId,
    Instant createdAt,
    Instant updatedAt) {

  public static ImageModel from(ImageDomain image) {
    return new ImageModel(
        image.getId(),
        image.getFileName(),
        image.getKey(),
        image.getMimeType(),
        image.getTitle(),
        image.getAltText(),
        image.getWidth(),
        image.getHeight(),
        image.getOwner().getId(),
        image.getCreatedAt(),
        image.getUpdatedAt());
  }
}
