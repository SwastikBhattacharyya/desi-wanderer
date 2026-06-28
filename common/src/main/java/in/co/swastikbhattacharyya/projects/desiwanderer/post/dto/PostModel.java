package in.co.swastikbhattacharyya.projects.desiwanderer.post.dto;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.domain.PostDomain;
import java.time.Instant;
import java.util.UUID;

public record PostModel(
    UUID id,
    String slug,
    String title,
    String description,
    String content,
    Boolean isPublished,
    Boolean isApproved,
    UUID imageId,
    UUID authorId,
    UUID reportId,
    Instant createdAt,
    Instant updatedAt) {

  public static PostModel from(PostDomain post) {
    return new PostModel(
        post.getId(),
        post.getSlug(),
        post.getTitle(),
        post.getDescription(),
        post.getContent(),
        post.getIsPublished(),
        post.getIsApproved(),
        post.getImage() == null ? null : post.getImage().getId(),
        post.getAuthor().getId(),
        post.getReport() == null ? null : post.getReport().getId(),
        post.getCreatedAt(),
        post.getUpdatedAt());
  }
}
