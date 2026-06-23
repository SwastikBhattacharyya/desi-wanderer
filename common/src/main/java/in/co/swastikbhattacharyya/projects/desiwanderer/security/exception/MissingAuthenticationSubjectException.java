package in.co.swastikbhattacharyya.projects.desiwanderer.security.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.UnauthorizedException;

public class MissingAuthenticationSubjectException extends UnauthorizedException {

  public MissingAuthenticationSubjectException() {
    super("Missing Authentication Subject", "The authentication subject is missing");
  }
}
