package in.co.swastikbhattacharyya.projects.desiwanderer.application.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import software.amazon.awssdk.regions.Region;

@ConfigurationProperties("aws.s3")
public record S3Properties(String bucket, Region region) {}
