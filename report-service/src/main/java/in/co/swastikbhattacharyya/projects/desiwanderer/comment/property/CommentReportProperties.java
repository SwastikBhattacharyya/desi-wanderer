package in.co.swastikbhattacharyya.projects.desiwanderer.comment.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;

@ConfigurationProperties(prefix = "comment.report")
public record CommentReportProperties(Resource prompt) {}
