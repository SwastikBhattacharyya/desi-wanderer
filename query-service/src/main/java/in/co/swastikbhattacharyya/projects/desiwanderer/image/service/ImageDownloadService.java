package in.co.swastikbhattacharyya.projects.desiwanderer.image.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.entity.Image;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.exception.ImageNotFoundException;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.repository.ImageRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageDownloadService {

  private final ImageRepository imageRepository;
  private final ImageS3Service imageS3Service;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_images:download")
  public ResponseInputStream<GetObjectResponse> downloadById(UUID id) {
    Image image =
        this.imageRepository.findById(id).orElseThrow(() -> new ImageNotFoundException(id));
    return this.imageS3Service.download(image);
  }
}
