package in.co.swastikbhattacharyya.projects.desiwanderer.image.service;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageFileService {

  public String getExtension(String mimeType) {
    return switch (mimeType) {
      case "image/jpeg" -> "jpg";
      case "image/png" -> "png";
      case "image/webp" -> "webp";
      default -> throw new IllegalArgumentException();
    };
  }

  public String getFullKey(UUID key, String mimeType) {
    return "%s.%s".formatted(key, this.getExtension(mimeType));
  }
}
