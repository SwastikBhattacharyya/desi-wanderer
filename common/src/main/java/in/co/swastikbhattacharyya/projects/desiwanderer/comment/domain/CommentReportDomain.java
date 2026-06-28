package in.co.swastikbhattacharyya.projects.desiwanderer.comment.domain;

import java.time.Instant;
import java.util.UUID;

public interface CommentReportDomain {

  UUID getId();

  default Boolean getIsApproved() {
    return null;
  }

  default String getDisapprovalReason() {
    return null;
  }

  default CommentDomain getComment() {
    return null;
  }

  default Instant getCreatedAt() {
    return null;
  }

  default Instant getUpdatedAt() {
    return null;
  }
}
