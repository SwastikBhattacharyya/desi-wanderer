package in.co.swastikbhattacharyya.projects.desiwanderer.security.config;

import in.co.swastikbhattacharyya.projects.desiwanderer.security.service.SecurityService;
import org.springframework.context.annotation.Bean;

public class SecurityServiceConfig {

  @Bean
  SecurityService securityService() {
    return new SecurityService();
  }
}
