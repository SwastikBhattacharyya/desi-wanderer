package in.co.swastikbhattacharyya.projects.desiwanderer.application.config;

import in.co.swastikbhattacharyya.projects.desiwanderer.application.property.AwsProperties;
import in.co.swastikbhattacharyya.projects.desiwanderer.application.property.S3Properties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

@Configuration
@RequiredArgsConstructor
public class S3Config {

  private final AwsProperties awsProperties;
  private final S3Properties s3Properties;

  @Bean
  S3Client s3Client(StaticCredentialsProvider staticCredentialsProvider) {
    return S3Client.builder()
        .endpointOverride(awsProperties.uri())
        .region(s3Properties.region())
        .credentialsProvider(staticCredentialsProvider)
        .serviceConfiguration(S3Configuration.builder().pathStyleAccessEnabled(true).build())
        .build();
  }
}
