package in.co.swastikbhattacharyya.projects.desiwanderer.user.consumer;

import in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation.KafkaConsumerFactory;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.dto.UserEventKey;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.dto.UserEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.service.UserCreateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.service.UserDeleteService;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.service.UserUpdateService;
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
    containerFactoryBeanName = "userConsumerFactory",
    key = UserEventKey.class,
    value = UserEventValue.class)
public class UserKafkaConsumer {

  private final UserCreateService userCreateService;
  private final UserUpdateService userUpdateService;
  private final UserDeleteService userDeleteService;

  @KafkaListener(
      topics = {UserTopics.KEYCLOAK_PUBLIC_USER_ENTITY},
      containerFactory = "userConsumerFactory")
  public void listen(
      UserEventValue value,
      @Header(KafkaHeaders.RECEIVED_KEY) UserEventKey key,
      @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
      @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
      @Header(KafkaHeaders.OFFSET) long offset,
      @Header(KafkaHeaders.RECEIVED_TIMESTAMP) long timestamp) {
    switch (value.operation()) {
      case READ, CREATE -> this.userCreateService.create(value);
      case UPDATE -> this.userUpdateService.update(key.id(), value);
      case DELETE -> this.userDeleteService.deleteById(key.id());
      case TRUNCATE -> this.userDeleteService.deleteAll();
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
