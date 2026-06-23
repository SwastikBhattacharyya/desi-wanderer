package in.co.swastikbhattacharyya.projects.desiwanderer.kafka.config;

import in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation.KafkaConsumerFactoryBuilder;
import org.springframework.boot.kafka.autoconfigure.KafkaProperties;
import org.springframework.context.annotation.Bean;

public class KafkaConsumerFactoryBuilderConfig {

  @Bean
  KafkaConsumerFactoryBuilder kafkaConsumerFactoryBuilder(KafkaProperties kafkaProperties) {
    return new KafkaConsumerFactoryBuilder(kafkaProperties);
  }
}
