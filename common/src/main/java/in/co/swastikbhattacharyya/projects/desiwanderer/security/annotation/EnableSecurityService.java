package in.co.swastikbhattacharyya.projects.desiwanderer.security.annotation;

import in.co.swastikbhattacharyya.projects.desiwanderer.security.config.SecurityServiceConfig;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.context.annotation.Import;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(SecurityServiceConfig.class)
public @interface EnableSecurityService {}
