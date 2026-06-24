package in.co.swastikbhattacharyya.projects.desiwanderer.application.config;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties
@ConfigurationPropertiesScan(basePackages = "in.co.swastikbhattacharyya.projects.desiwanderer")
public class PropertiesConfig {}
