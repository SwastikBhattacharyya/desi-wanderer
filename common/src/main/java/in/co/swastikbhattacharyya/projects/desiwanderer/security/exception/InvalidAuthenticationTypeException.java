package in.co.swastikbhattacharyya.projects.desiwanderer.security.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.UnauthorizedException;

public class InvalidAuthenticationTypeException extends UnauthorizedException {

  public InvalidAuthenticationTypeException() {
    super("Invalid Authentication", "The current authentication is not of the expected type");
  }
}
