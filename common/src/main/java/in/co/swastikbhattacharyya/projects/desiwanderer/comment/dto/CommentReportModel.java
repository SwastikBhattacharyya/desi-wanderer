package in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.domain.CommentReportDomain;
import java.time.Instant;
import java.util.UUID;

public record CommentReportModel(
    UUID id,
    Boolean isApproved,
    String disapprovalReason,
    UUID commentId,
    Instant createdAt,
    Instant updatedAt) {

  public static CommentReportModel from(CommentReportDomain commentReport) {
    return new CommentReportModel(
        commentReport.getId(),
        commentReport.getIsApproved(),
        commentReport.getDisapprovalReason(),
        commentReport.getComment().getId(),
        commentReport.getCreatedAt(),
        commentReport.getUpdatedAt());
  }
}
