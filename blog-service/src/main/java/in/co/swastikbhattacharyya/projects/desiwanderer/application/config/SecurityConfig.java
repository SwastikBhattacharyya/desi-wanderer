package in.co.swastikbhattacharyya.projects.desiwanderer.application.config;

import in.co.swastikbhattacharyya.projects.desiwanderer.security.annotation.EnableSecurityService;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableSecurityService
@EnableMethodSecurity
public class SecurityConfig {

  @Bean
  @SneakyThrows
  SecurityFilterChain securityFilterChain(HttpSecurity http) {
    return http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
        .oauth2ResourceServer(oauth -> oauth.jwt(Customizer.withDefaults()))
        .anonymous(anonymous -> anonymous.authorities("SCOPE_posts:read", "SCOPE_comments:read"))
        .build();
  }
}
