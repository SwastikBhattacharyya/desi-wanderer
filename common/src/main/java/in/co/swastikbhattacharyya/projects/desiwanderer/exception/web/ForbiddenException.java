package in.co.swastikbhattacharyya.projects.desiwanderer.exception.web;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends HttpServiceException {

  public ForbiddenException(String title, String detail) {
    super(HttpStatus.FORBIDDEN, title, detail);
  }
}
