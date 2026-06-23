package in.co.swastikbhattacharyya.projects.desiwanderer.exception.web;

import java.time.Instant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.ErrorResponseException;

public class HttpServiceException extends ErrorResponseException {

  public HttpServiceException(HttpStatus status, String title, String detail) {
    super(status, HttpServiceException.problemDetailFrom(status, title, detail), null);
  }

  private static ProblemDetail problemDetailFrom(HttpStatus status, String title, String detail) {
    ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(status, detail);
    problemDetail.setTitle(title);
    problemDetail.setProperty("timestamp", Instant.now());
    return problemDetail;
  }
}
