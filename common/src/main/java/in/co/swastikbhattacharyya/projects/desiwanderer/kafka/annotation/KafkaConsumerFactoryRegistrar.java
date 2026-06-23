package in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation;

import java.util.Map;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;

public class KafkaConsumerFactoryRegistrar implements ImportBeanDefinitionRegistrar {

  @Override
  public void registerBeanDefinitions(
      AnnotationMetadata metadata, @NonNull BeanDefinitionRegistry registry) {
    Map<String, Object> attributes =
        metadata.getAnnotationAttributes(KafkaConsumerFactory.class.getName());
    if (attributes == null) return;

    String beanName = (String) attributes.get("containerFactoryBeanName");
    Class<?> keyClass = (Class<?>) attributes.get("key");
    Class<?> valueClass = (Class<?>) attributes.get("value");

    RootBeanDefinition beanDefinition = new RootBeanDefinition();
    beanDefinition.setBeanClass(ConcurrentKafkaListenerContainerFactory.class);
    beanDefinition.setFactoryBeanName("kafkaConsumerFactoryBuilder");
    beanDefinition.setFactoryMethodName("containerFactory");
    beanDefinition.getConstructorArgumentValues().addGenericArgumentValue(keyClass);
    beanDefinition.getConstructorArgumentValues().addGenericArgumentValue(valueClass);
    registry.registerBeanDefinition(beanName, beanDefinition);
  }
}
