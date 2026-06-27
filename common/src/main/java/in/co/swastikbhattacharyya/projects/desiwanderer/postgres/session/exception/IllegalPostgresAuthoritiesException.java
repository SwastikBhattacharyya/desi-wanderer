package in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.HttpServiceException;
import org.springframework.http.HttpStatus;

public class IllegalPostgresAuthoritiesException extends HttpServiceException {

  public IllegalPostgresAuthoritiesException() {
    super(
        HttpStatus.UNPROCESSABLE_CONTENT,
        "Illegal Postgres Authorities",
        "Unable to process Postgres user authorities");
  }
}
