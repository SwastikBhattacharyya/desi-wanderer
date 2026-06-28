package in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.domain.CommentDomain;
import java.time.Instant;
import java.util.UUID;

public record CommentModel(
    UUID id,
    String content,
    Boolean isApproved,
    UUID authorId,
    UUID postId,
    UUID reportId,
    Instant createdAt,
    Instant updatedAt) {

  public static CommentModel from(CommentDomain comment) {
    return new CommentModel(
        comment.getId(),
        comment.getContent(),
        comment.getIsApproved(),
        comment.getAuthor().getId(),
        comment.getPost().getId(),
        comment.getReport() == null ? null : comment.getReport().getId(),
        comment.getCreatedAt(),
        comment.getUpdatedAt());
  }
}
