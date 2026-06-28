package in.co.swastikbhattacharyya.projects.desiwanderer.image.exception;

import in.co.swastikbhattacharyya.projects.desiwanderer.exception.web.HttpServiceException;
import org.springframework.http.HttpStatus;

public class ImageInvalidException extends HttpServiceException {

  public ImageInvalidException() {
    super(HttpStatus.UNPROCESSABLE_CONTENT, "Invalid Image", "Unable to process image");
  }
}
