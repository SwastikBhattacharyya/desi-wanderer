package in.co.swastikbhattacharyya.projects.desiwanderer.post.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;

@ConfigurationProperties(prefix = "post.report")
public record PostReportProperties(Resource prompt) {}
