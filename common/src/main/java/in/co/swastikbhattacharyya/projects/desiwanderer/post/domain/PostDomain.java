package in.co.swastikbhattacharyya.projects.desiwanderer.post.domain;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.domain.CommentDomain;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.domain.ImageDomain;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.domain.UserDomain;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public interface PostDomain {

  UUID getId();

  default String getSlug() {
    return null;
  }

  default String getTitle() {
    return null;
  }

  default String getDescription() {
    return null;
  }

  default String getContent() {
    return null;
  }

  default Boolean getIsPublished() {
    return null;
  }

  default Boolean getIsApproved() {
    return null;
  }

  default ImageDomain getImage() {
    return null;
  }

  default UserDomain getAuthor() {
    return null;
  }

  default Set<? extends CommentDomain> getComments() {
    return new HashSet<>();
  }

  default PostReportDomain getReport() {
    return null;
  }

  default Instant getCreatedAt() {
    return null;
  }

  default Instant getUpdatedAt() {
    return null;
  }
}
