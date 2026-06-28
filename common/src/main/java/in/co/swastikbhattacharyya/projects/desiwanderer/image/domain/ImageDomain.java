package in.co.swastikbhattacharyya.projects.desiwanderer.image.domain;

import in.co.swastikbhattacharyya.projects.desiwanderer.user.domain.UserDomain;
import java.time.Instant;
import java.util.UUID;

public interface ImageDomain {

  UUID getId();

  default String getFileName() {
    return null;
  }

  default UUID getKey() {
    return null;
  }

  default String getMimeType() {
    return null;
  }

  default String getTitle() {
    return null;
  }

  default String getAltText() {
    return null;
  }

  default Integer getWidth() {
    return null;
  }

  default Integer getHeight() {
    return null;
  }

  default UserDomain getOwner() {
    return null;
  }

  default Instant getCreatedAt() {
    return null;
  }

  default Instant getUpdatedAt() {
    return null;
  }
}
