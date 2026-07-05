package in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.kafka.autoconfigure.KafkaProperties;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JacksonJsonSerializer;

@RequiredArgsConstructor
public class KafkaProducerFactoryBuilder {
  private final KafkaProperties kafkaProperties;

  public <K, V> ProducerFactory<K, V> producerFactory() {
    Map<String, Object> props = new HashMap<>(kafkaProperties.buildProducerProperties());
    JacksonJsonSerializer<K> keySerializer = new JacksonJsonSerializer<>();
    JacksonJsonSerializer<V> valueSerializer = new JacksonJsonSerializer<>();
    return new DefaultKafkaProducerFactory<>(props, keySerializer, valueSerializer);
  }

  public <K, V> KafkaTemplate<K, V> kafkaTemplate() {
    return new KafkaTemplate<>(producerFactory());
  }
}
