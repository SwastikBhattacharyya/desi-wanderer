package in.co.swastikbhattacharyya.projects.desiwanderer.post.domain;

import java.time.Instant;
import java.util.UUID;

public interface PostReportDomain {

  UUID getId();

  default String getLanguageReport() {
    return null;
  }

  default Float getLanguageScore() {
    return null;
  }

  default String getRelevanceReport() {
    return null;
  }

  default Float getRelevanceScore() {
    return null;
  }

  default String getVulgarityReport() {
    return null;
  }

  default Float getVulgarityScore() {
    return null;
  }

  default String getOverallReport() {
    return null;
  }

  default Float getOverallScore() {
    return null;
  }

  default Boolean getIsApproved() {
    return null;
  }

  default Boolean getIsOld() {
    return null;
  }

  default PostDomain getPost() {
    return null;
  }

  default Instant getCreatedAt() {
    return null;
  }

  default Instant getUpdatedAt() {
    return null;
  }
}
