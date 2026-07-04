package in.co.swastikbhattacharyya.projects.desiwanderer.image.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.entity.Image;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.exception.ImageNotFoundException;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.repository.ImageRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageQueryService {

  private final ImageRepository imageRepository;

  public Image findById(UUID id) {
    return this.imageRepository.findById(id).orElseThrow(() -> new ImageNotFoundException(id));
  }
}
