package in.co.swastikbhattacharyya.projects.desiwanderer.exception.web;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends HttpServiceException {

  public UnauthorizedException(String title, String detail) {
    super(HttpStatus.UNAUTHORIZED, title, detail);
  }
}
