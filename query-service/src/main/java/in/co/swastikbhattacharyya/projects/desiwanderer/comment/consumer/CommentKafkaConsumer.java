package in.co.swastikbhattacharyya.projects.desiwanderer.comment.consumer;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentEventKey;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.service.CommentCreateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.service.CommentDeleteService;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.service.CommentUpdateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation.KafkaConsumerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Slf4j
@RequiredArgsConstructor
@KafkaConsumerFactory(
    containerFactoryBeanName = "commentConsumerFactory",
    key = CommentEventKey.class,
    value = CommentEventValue.class)
public class CommentKafkaConsumer {

  private final CommentCreateService commentCreateService;
  private final CommentUpdateService commentUpdateService;
  private final CommentDeleteService commentDeleteService;

  @KafkaListener(
      topics = {CommentTopics.BLOG_PUBLIC_COMMENTS},
      containerFactory = "commentConsumerFactory")
  @Transactional
  public void listen(
      CommentEventValue value,
      @Header(KafkaHeaders.RECEIVED_KEY) CommentEventKey key,
      @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
      @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
      @Header(KafkaHeaders.OFFSET) long offset,
      @Header(KafkaHeaders.RECEIVED_TIMESTAMP) long timestamp) {
    switch (value.operation()) {
      case READ, CREATE -> this.commentCreateService.create(value);
      case UPDATE -> this.commentUpdateService.update(key.id(), value);
      case DELETE -> this.commentDeleteService.deleteById(key.id());
      case TRUNCATE -> this.commentDeleteService.deleteAll();
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
