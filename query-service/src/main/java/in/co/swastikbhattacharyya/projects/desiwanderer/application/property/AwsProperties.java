package in.co.swastikbhattacharyya.projects.desiwanderer.application.property;

import java.net.URI;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "aws")
public record AwsProperties(URI uri, String accessKey, String secretKey) {}
