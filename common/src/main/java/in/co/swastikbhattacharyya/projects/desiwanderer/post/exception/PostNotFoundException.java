package in.co.swastikbhattacharyya.projects.desiwanderer.post.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.HttpServiceException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class PostNotFoundException extends HttpServiceException {

  public PostNotFoundException(UUID id) {
    super(HttpStatus.NOT_FOUND, "Post Not Found", "Post with id %s not found".formatted(id));
  }

  public PostNotFoundException(String slug) {
    super(HttpStatus.NOT_FOUND, "Post Not Found", "Post with slug %s not found".formatted(slug));
  }
}
