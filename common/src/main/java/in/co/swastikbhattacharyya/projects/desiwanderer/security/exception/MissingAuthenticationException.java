package in.co.swastikbhattacharyya.projects.desiwanderer.security.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.UnauthorizedException;

public class MissingAuthenticationException extends UnauthorizedException {

  public MissingAuthenticationException() {
    super("Authentication Missing", "Failed to get user authentication details");
  }
}
