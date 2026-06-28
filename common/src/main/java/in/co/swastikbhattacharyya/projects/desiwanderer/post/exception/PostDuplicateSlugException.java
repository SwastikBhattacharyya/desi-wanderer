package in.co.swastikbhattacharyya.projects.desiwanderer.post.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.HttpServiceException;
import org.springframework.http.HttpStatus;

public class PostDuplicateSlugException extends HttpServiceException {

  public PostDuplicateSlugException(String slug) {
    super(HttpStatus.NOT_FOUND, "Post Not Found", "Post with slug %s already exists".formatted(slug));
  }
}
