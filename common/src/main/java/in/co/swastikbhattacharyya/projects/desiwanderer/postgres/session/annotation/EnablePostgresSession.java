package in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation;

import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.config.PostgresSessionConfig;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.context.annotation.Import;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(PostgresSessionConfig.class)
public @interface EnablePostgresSession {}
