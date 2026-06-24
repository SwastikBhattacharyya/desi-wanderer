package in.co.swastikbhattacharyya.projects.desiwanderer.application.config;

import org.apache.tika.Tika;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TikaConfig {

  @Bean
  Tika tika() {
    return new Tika();
  }
}
