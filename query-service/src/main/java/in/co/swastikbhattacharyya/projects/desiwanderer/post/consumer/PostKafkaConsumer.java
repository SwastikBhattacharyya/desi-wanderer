package in.co.swastikbhattacharyya.projects.desiwanderer.post.consumer;

import in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation.KafkaConsumerFactory;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostEventKey;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostCreateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostDeleteService;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostUpdateService;
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
    containerFactoryBeanName = "postConsumerFactory",
    key = PostEventKey.class,
    value = PostEventValue.class)
public class PostKafkaConsumer {

  private final PostCreateService postCreateService;
  private final PostUpdateService postUpdateService;
  private final PostDeleteService postDeleteService;

  @KafkaListener(
      topics = {PostTopics.BLOG_PUBLIC_POSTS},
      containerFactory = "postConsumerFactory")
  public void listen(
      PostEventValue value,
      @Header(KafkaHeaders.RECEIVED_KEY) PostEventKey key,
      @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
      @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
      @Header(KafkaHeaders.OFFSET) long offset,
      @Header(KafkaHeaders.RECEIVED_TIMESTAMP) long timestamp) {
    switch (value.operation()) {
      case READ, CREATE -> this.postCreateService.create(value);
      case UPDATE -> this.postUpdateService.update(key.id(), value);
      case DELETE -> this.postDeleteService.deleteById(key.id());
      case TRUNCATE -> this.postDeleteService.deleteAll();
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
