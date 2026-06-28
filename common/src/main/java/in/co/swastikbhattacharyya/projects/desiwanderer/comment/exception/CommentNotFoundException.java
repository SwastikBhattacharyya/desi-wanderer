package in.co.swastikbhattacharyya.projects.desiwanderer.comment.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.HttpServiceException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class CommentNotFoundException extends HttpServiceException {

  public CommentNotFoundException(UUID id) {
    super(HttpStatus.NOT_FOUND, "Comment Not Found", "Comment with id %s not found".formatted(id));
  }
}
