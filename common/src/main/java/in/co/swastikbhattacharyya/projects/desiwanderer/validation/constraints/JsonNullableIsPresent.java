package in.co.swastikbhattacharyya.projects.desiwanderer.validation.constraints;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = JsonNullableIsPresentValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER, ElementType.RECORD_COMPONENT})
@Retention(RetentionPolicy.RUNTIME)
public @interface JsonNullableIsPresent {

  String message() default "Field is required";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
