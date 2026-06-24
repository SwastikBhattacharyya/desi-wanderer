package in.co.swastikbhattacharyya.projects.desiwanderer.image.validation.constraints;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ImageValidator.class)
@Documented
public @interface ValidImage {

  String message() default "Invalid image";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

  long maxSizeMb() default 5;
}
