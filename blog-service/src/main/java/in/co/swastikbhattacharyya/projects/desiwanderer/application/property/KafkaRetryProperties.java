package in.co.swastikbhattacharyya.projects.desiwanderer.application.property;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "kafka.retry")
public record KafkaRetryProperties(Duration delay, int multiplier, Duration maxDelay) {}
