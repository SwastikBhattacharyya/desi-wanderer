package in.co.swastikbhattacharyya.projects.desiwanderer.comment.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.HttpServiceException;
import org.springframework.http.HttpStatus;

public class InvalidCommentReportResultException extends HttpServiceException {

  public InvalidCommentReportResultException() {
    super(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Invalid Comment Report",
        "Comment report format is invalid");
  }
}
