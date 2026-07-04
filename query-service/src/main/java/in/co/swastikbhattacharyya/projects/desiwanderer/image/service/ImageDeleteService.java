package in.co.swastikbhattacharyya.projects.desiwanderer.image.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.entity.Image;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.repository.ImageRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageDeleteService {

  private final ImageRepository imageRepository;
  private final ImageQueryService imageQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_images:cdc")
  public void deleteById(UUID id) {
    Image image = this.imageQueryService.findById(id);
    this.imageRepository.delete(image);
    log.info("Image deleted: post={}", image);
  }

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_images:cdc")
  public void deleteAll() {
    this.imageRepository.deleteAllInBatch();
    log.info("Images truncated");
  }
}
