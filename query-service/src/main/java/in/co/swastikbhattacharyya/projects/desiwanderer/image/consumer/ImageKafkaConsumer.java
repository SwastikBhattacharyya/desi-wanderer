package in.co.swastikbhattacharyya.projects.desiwanderer.image.consumer;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.dto.ImageEventKey;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.dto.ImageEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.service.ImageCreateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.service.ImageDeleteService;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.service.ImageUpdateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation.KafkaConsumerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
@KafkaConsumerFactory(
    containerFactoryBeanName = "imageConsumerFactory",
    key = ImageEventKey.class,
    value = ImageEventValue.class)
public class ImageKafkaConsumer {

  private final ImageCreateService imageCreateService;
  private final ImageUpdateService imageUpdateService;
  private final ImageDeleteService imageDeleteService;

  @KafkaListener(
      topics = {ImageTopics.BLOG_PUBLIC_IMAGES},
      containerFactory = "imageConsumerFactory")
  public void listen(
      ImageEventValue value,
      @Header(KafkaHeaders.RECEIVED_KEY) ImageEventKey key,
      @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
      @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
      @Header(KafkaHeaders.OFFSET) long offset,
      @Header(KafkaHeaders.RECEIVED_TIMESTAMP) long timestamp) {
    switch (value.operation()) {
      case READ, CREATE -> this.imageCreateService.create(value);
      case UPDATE -> this.imageUpdateService.update(key.id(), value);
      case DELETE -> this.imageDeleteService.deleteById(key.id());
      case TRUNCATE -> this.imageDeleteService.deleteAll();
    }

    log.info(
        "Handled Kafka event: key={}, operation={} topic={}, partition={}, offset={}",
        key,
        value.operation(),
        topic,
        partition,
        offset);
  }
}
