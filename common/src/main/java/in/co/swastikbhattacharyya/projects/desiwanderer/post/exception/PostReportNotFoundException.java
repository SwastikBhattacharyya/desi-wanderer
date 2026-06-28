package in.co.swastikbhattacharyya.projects.desiwanderer.post.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.HttpServiceException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class PostReportNotFoundException extends HttpServiceException {

  public PostReportNotFoundException(UUID id) {
    super(
        HttpStatus.NOT_FOUND,
        "Post Report Found",
        "Post Report with id %s not found".formatted(id));
  }
}
