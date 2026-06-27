package in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session;

import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.exception.IllegalPostgresAuthoritiesException;
import in.co.swastikbhattacharyya.projects.desiwanderer.security.service.SecurityService;
import java.sql.Types;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.json.JsonMapper;

@RequiredArgsConstructor
public class PostgresSessionContext {

  private final JdbcTemplate jdbcTemplate;
  private final JsonMapper jsonMapper;
  private final SecurityService securityService;

  public void initialize(List<String> additionalAuthorities) {
    if (this.securityService.isUnauthenticated()) {
      this.initializeAnonymous(additionalAuthorities);
      return;
    }
    this.initializeAuthenticated(additionalAuthorities);
  }

  private void initializeAnonymous(List<String> additionalAuthorities) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null) {
      this.applySessionContext(null, additionalAuthorities);
      return;
    }

    this.applySessionContext(null, this.getAuthorities(authentication, additionalAuthorities));
  }

  private void initializeAuthenticated(List<String> additionalAuthorities) {
    Authentication authentication = this.securityService.getAuthentication();

    this.applySessionContext(
        this.securityService.getUserId(),
        this.getAuthorities(authentication, additionalAuthorities));
  }

  private List<String> getAuthorities(
      Authentication authentication, List<String> additionalAuthorities) {
    Set<String> authorities =
        new LinkedHashSet<>(
            authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList());
    authorities.addAll(additionalAuthorities);
    return List.copyOf(authorities);
  }

  private void applySessionContext(UUID userId, List<String> authorities) {
    String authoritiesJson;
    if (authorities == null || authorities.isEmpty()) authoritiesJson = "[]";
    else {
      try {
        authoritiesJson = this.jsonMapper.writeValueAsString(authorities);
      } catch (JacksonException ex) {
        throw new IllegalPostgresAuthoritiesException();
      }
    }

    this.jdbcTemplate.execute(
        """
      SELECT
          set_config('app.authentication.subject_id', ?, true),
          set_config('app.authorities', ?, true)
      """,
        (PreparedStatementCallback<Void>)
            ps -> {
              if (userId == null) ps.setNull(1, Types.VARCHAR);
              else ps.setString(1, userId.toString());
              ps.setString(2, authoritiesJson);
              ps.execute();
              return null;
            });
  }
}
