package in.co.swastikbhattacharyya.projects.desiwanderer.image.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.HttpServiceException;
import java.util.UUID;
import org.springframework.http.HttpStatus;

public class ImageNotFoundException extends HttpServiceException {

  public ImageNotFoundException(UUID id) {
    super(HttpStatus.NOT_FOUND, "Image Not Found", "Image with id %s not found".formatted(id));
  }
}
