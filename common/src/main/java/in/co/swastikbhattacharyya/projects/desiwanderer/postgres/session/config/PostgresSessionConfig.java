package in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.config;

import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.PostgresSessionContext;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.aspect.PostgresSessionAspect;
import in.co.swastikbhattacharyya.projects.desiwanderer.security.service.SecurityService;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import tools.jackson.databind.json.JsonMapper;

public class PostgresSessionConfig {

  @Bean
  PostgresSessionContext postgresSessionContext(
      JdbcTemplate jdbcTemplate, JsonMapper jsonMapper, SecurityService securityService) {
    return new PostgresSessionContext(jdbcTemplate, jsonMapper, securityService);
  }

  @Bean
  PostgresSessionAspect postgresSessionAspect(PostgresSessionContext context) {
    return new PostgresSessionAspect(context);
  }
}
