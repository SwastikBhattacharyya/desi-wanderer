package in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.aspect;

import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.PostgresSessionContext;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
@RequiredArgsConstructor
public class PostgresSessionAspect {

  private final PostgresSessionContext context;

  @Before("@annotation(initializePostgresSession)")
  public void initialize(InitializePostgresSession initializePostgresSession) {
    context.initialize(List.of(initializePostgresSession.additionalAuthorities()));
  }
}
