package in.co.swastikbhattacharyya.projects.desiwanderer.validation.constraints;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.openapitools.jackson.nullable.JsonNullable;

public class JsonNullableIsPresentValidator
    implements ConstraintValidator<JsonNullableIsPresent, JsonNullable<?>> {

  @Override
  public boolean isValid(
      JsonNullable<?> jsonNullable, ConstraintValidatorContext constraintValidatorContext) {
    return jsonNullable != null && jsonNullable.isPresent();
  }
}
