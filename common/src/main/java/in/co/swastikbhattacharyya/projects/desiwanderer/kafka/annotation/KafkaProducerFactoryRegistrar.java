package in.co.swastikbhattacharyya.projects.desiwanderer.kafka.annotation;

import java.util.Map;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.kafka.core.KafkaTemplate;

public class KafkaProducerFactoryRegistrar implements ImportBeanDefinitionRegistrar {

  @Override
  public void registerBeanDefinitions(
      AnnotationMetadata metadata, @NonNull BeanDefinitionRegistry registry) {
    Map<String, Object> attributes =
        metadata.getAnnotationAttributes(KafkaProducerFactory.class.getName());
    if (attributes == null) return;

    String beanName = (String) attributes.get("kafkaTemplateBeanName");

    RootBeanDefinition beanDefinition = new RootBeanDefinition();
    beanDefinition.setBeanClass(KafkaTemplate.class);
    beanDefinition.setFactoryBeanName("kafkaProducerFactoryBuilder");
    beanDefinition.setFactoryMethodName("kafkaTemplate");
    registry.registerBeanDefinition(beanName, beanDefinition);
  }
}
