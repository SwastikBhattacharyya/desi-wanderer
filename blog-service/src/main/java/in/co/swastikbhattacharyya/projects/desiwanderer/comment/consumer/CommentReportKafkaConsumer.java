package in.co.swastikbhattacharyya.projects.desiwanderer.comment.consumer;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentReportEventKey;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentReportEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.service.CommentApprovalService;
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
    containerFactoryBeanName = "commentReportConsumerFactory",
    key = CommentReportEventKey.class,
    value = CommentReportEventValue.class)
public class CommentReportKafkaConsumer {

  private final CommentApprovalService commentApprovalService;

  @KafkaListener(
      topics = {CommentTopics.REPORT_PUBLIC_COMMENT_REPORTS},
      containerFactory = "commentReportConsumerFactory")
  public void listen(
      CommentReportEventValue value,
      @Header(KafkaHeaders.RECEIVED_KEY) CommentReportEventKey key,
      @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
      @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
      @Header(KafkaHeaders.OFFSET) long offset,
      @Header(KafkaHeaders.RECEIVED_TIMESTAMP) long timestamp) {
    switch (value.operation()) {
      case READ, CREATE, UPDATE -> this.commentApprovalService.create(value);
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
