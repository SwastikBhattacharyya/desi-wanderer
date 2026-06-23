package in.co.swastikbhattacharyya.projects.desiwanderer.user.domain;

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
}
