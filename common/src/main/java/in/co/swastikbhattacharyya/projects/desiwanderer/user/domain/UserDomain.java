package in.co.swastikbhattacharyya.projects.desiwanderer.user.domain;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.domain.ImageDomain;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public interface UserDomain {

  UUID getId();

  default String getEmail() {
    return null;
  }

  default String getFirstName() {
    return null;
  }

  default String getLastName() {
    return null;
  }

  default String getUsername() {
    return null;
  }

  default Set<? extends ImageDomain> getImages() {
    return new HashSet<>();
  }
}
