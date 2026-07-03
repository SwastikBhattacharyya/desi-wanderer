package in.co.swastikbhattacharyya.projects.desiwanderer.post.consumer;

import in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation.KafkaConsumerFactory;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostReportEventKey;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostReportEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostApprovalService;
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
    containerFactoryBeanName = "postReportConsumerFactory",
    key = PostReportEventKey.class,
    value = PostReportEventValue.class)
public class PostReportKafkaConsumer {

  private final PostApprovalService postApprovalService;

  @KafkaListener(
      topics = {PostTopics.REPORT_PUBLIC_POST_REPORTS},
      containerFactory = "postReportConsumerFactory")
  public void listen(
      PostReportEventValue value,
      @Header(KafkaHeaders.RECEIVED_KEY) PostReportEventKey key,
      @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
      @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
      @Header(KafkaHeaders.OFFSET) long offset,
      @Header(KafkaHeaders.RECEIVED_TIMESTAMP) long timestamp) {
    switch (value.operation()) {
      case READ, CREATE, UPDATE -> this.postApprovalService.create(value);
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
