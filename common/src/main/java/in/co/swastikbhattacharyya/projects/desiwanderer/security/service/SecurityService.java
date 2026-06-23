package in.co.swastikbhattacharyya.projects.desiwanderer.security.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.security.exception.InvalidAuthenticationSubjectException;
import in.co.swastikbhattacharyya.projects.desiwanderer.security.exception.MissingAuthenticationException;
import in.co.swastikbhattacharyya.projects.desiwanderer.security.exception.MissingAuthenticationSubjectException;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

public class SecurityService {

  public boolean isUnauthenticated() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return !(authentication instanceof JwtAuthenticationToken) || !authentication.isAuthenticated();
  }

  public Authentication getAuthentication() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (this.isUnauthenticated()) throw new MissingAuthenticationException();
    return authentication;
  }

  public Jwt getJwt() {
    JwtAuthenticationToken authentication = (JwtAuthenticationToken) this.getAuthentication();
    return authentication.getToken();
  }

  public UUID getUserId() {
    Jwt jwt = this.getJwt();
    String subject = jwt.getSubject();
    if (subject == null) throw new MissingAuthenticationSubjectException();

    try {
      return UUID.fromString(subject);
    } catch (IllegalArgumentException ignored) {
      throw new InvalidAuthenticationSubjectException();
    }
  }

  public boolean hasScope(String scope) {
    Authentication authentication = this.getAuthentication();

    return authentication.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .anyMatch(scope::equals);
  }
}
