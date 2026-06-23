package in.co.swastikbhattacharyya.projects.desiwanderer.security.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.UnauthorizedException;

public class InvalidAuthenticationSubjectException extends UnauthorizedException {

  public InvalidAuthenticationSubjectException() {
    super(
        "Invalid Authentication Subject",
        "The current authentication subject is not of the expected type");
  }
}
