package in.co.swastikbhattacharyya.projects.desiwanderer.image.validation.constraints;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Set;
import org.apache.tika.Tika;
import org.springframework.web.multipart.MultipartFile;

public class ImageValidator implements ConstraintValidator<ValidImage, MultipartFile> {

  private static final Set<String> ALLOWED_TYPES = Set.of("image/jpeg", "image/png", "image/webp");
  private final Tika tika = new Tika();
  private long maxSizeBytes;

  @Override
  public void initialize(ValidImage constraintAnnotation) {
    this.maxSizeBytes = constraintAnnotation.maxSizeMb() * 1024 * 1024;
  }

  @Override
  public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
    if (file == null || file.isEmpty()) {
      addViolation(context, "Image file is required");
      return false;
    }

    if (file.getSize() > maxSizeBytes) {
      addViolation(context, "Image size must not exceed " + (maxSizeBytes / 1024 / 1024) + " MB");
      return false;
    }

    try {
      String mimeType = tika.detect(file.getInputStream());
      if (!ALLOWED_TYPES.contains(mimeType)) {
        addViolation(context, "Only JPEG, PNG, and WEBP images are allowed");
        return false;
      }
      return true;
    } catch (Exception ex) {
      addViolation(context, "Unable to validate image");
      return false;
    }
  }

  private void addViolation(ConstraintValidatorContext context, String message) {
    context.disableDefaultConstraintViolation();
    context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
  }
}
