package in.co.swastikbhattacharyya.projects.desiwanderer.image.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.dto.ImagePayload;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.entity.Image;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageUpdateService {

  private final ImageQueryService imageQueryService;

  @Transactional
  @InitializePostgresSession
  public Image update(UUID id, ImagePayload payload) {
    Image image = this.imageQueryService.findById(id);

    payload.title().ifPresent(image::setTitle);
    payload.altText().ifPresent(image::setAltText);

    log.info("Image updated: image={}", image);
    return image;
  }
}
