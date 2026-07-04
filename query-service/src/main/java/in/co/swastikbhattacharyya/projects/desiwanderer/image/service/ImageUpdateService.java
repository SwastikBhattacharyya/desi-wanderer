package in.co.swastikbhattacharyya.projects.desiwanderer.image.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.dto.ImageEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.entity.Image;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.service.UserQueryService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageUpdateService {

  private final ImageQueryService imageQueryService;
  private final UserQueryService userQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_images:cdc")
  public void update(UUID id, ImageEventValue event) {
    Image image = this.imageQueryService.findById(id);

    if (image.getLastProcessedLsn() > event.lsn()) return;

    image.setFileName(event.fileName());
    image.setKey(event.key());
    image.setMimeType(event.mimeType());
    image.setTitle(event.title());
    image.setAltText(event.altText());
    image.setLastProcessedLsn(event.lsn());
    image.setWidth(event.width());
    image.setHeight(event.height());
    image.setLastProcessedLsn(event.lsn());
    image.setOwner(this.userQueryService.findById(event.ownerId()));
    image.setCreatedAt(event.createdAt());
    image.setUpdatedAt(event.updatedAt());

    log.info("Image updated: image={}", image);
  }
}
