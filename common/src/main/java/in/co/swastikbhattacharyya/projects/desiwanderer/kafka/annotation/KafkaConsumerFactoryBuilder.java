package in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.kafka.autoconfigure.KafkaProperties;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JacksonJsonDeserializer;

@EnableKafka
@RequiredArgsConstructor
public class KafkaConsumerFactoryBuilder {

  private final KafkaProperties kafkaProperties;

  public <K, V> ConsumerFactory<K, V> consumerFactory(Class<K> keyClass, Class<V> valueClass) {
    Map<String, Object> props = new HashMap<>(kafkaProperties.buildConsumerProperties());
    JacksonJsonDeserializer<K> keyDeserializer = new JacksonJsonDeserializer<>(keyClass);
    JacksonJsonDeserializer<V> valueDeserializer = new JacksonJsonDeserializer<>(valueClass);
    return new DefaultKafkaConsumerFactory<>(props, keyDeserializer, valueDeserializer);
  }

  public <K, V> ConcurrentKafkaListenerContainerFactory<K, V> containerFactory(
      Class<K> keyClass, Class<V> valueClass) {
    ConcurrentKafkaListenerContainerFactory<K, V> factory =
        new ConcurrentKafkaListenerContainerFactory<>();
    factory.setConsumerFactory(this.consumerFactory(keyClass, valueClass));
    return factory;
  }
}
