package in.co.swastikbhattacharyya.projects.desiwanderer.application.config;

import in.co.swastikbhattacharyya.projects.desiwanderer.application.property.KafkaRetryProperties;
import in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation.EnableKafkaConsumerFactoryBuilder;
import in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation.KafkaProducerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.retrytopic.RetryTopicConfiguration;
import org.springframework.kafka.retrytopic.RetryTopicConfigurationBuilder;

@Configuration
@EnableKafkaConsumerFactoryBuilder
@KafkaProducerFactory(kafkaTemplateBeanName = "blogServiceProducerTemplate")
public class KafkaConfig {

  @Bean
  RetryTopicConfiguration retryTopicConfiguration(
      @Qualifier("blogServiceProducerTemplate") KafkaTemplate<String, Object> kafkaTemplate,
      KafkaRetryProperties properties) {
    return RetryTopicConfigurationBuilder.newInstance()
        .exponentialBackoff(
            properties.delay().toMillis(),
            properties.multiplier(),
            properties.maxDelay().toMillis())
        .create(kafkaTemplate);
  }
}
