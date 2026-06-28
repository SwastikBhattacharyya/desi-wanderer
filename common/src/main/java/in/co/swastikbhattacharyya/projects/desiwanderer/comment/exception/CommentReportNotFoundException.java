package in.co.swastikbhattacharyya.projects.desiwanderer.comment.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.HttpServiceException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class CommentReportNotFoundException extends HttpServiceException {

  public CommentReportNotFoundException(UUID id) {
    super(
        HttpStatus.NOT_FOUND,
        "Comment Report Not Found",
        "Comment Report with id %s not found".formatted(id));
  }
}
