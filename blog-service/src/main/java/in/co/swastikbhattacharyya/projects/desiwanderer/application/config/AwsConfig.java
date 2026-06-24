package in.co.swastikbhattacharyya.projects.desiwanderer.application.config;

import in.co.swastikbhattacharyya.projects.desiwanderer.application.property.AwsProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;

@Configuration
@RequiredArgsConstructor
public class AwsConfig {

  private final AwsProperties awsProperties;

  @Bean
  StaticCredentialsProvider staticCredentialsProvider() {
    return StaticCredentialsProvider.create(
        AwsBasicCredentials.create(awsProperties.accessKey(), awsProperties.secretKey()));
  }
}
