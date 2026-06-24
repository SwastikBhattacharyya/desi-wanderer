package in.co.swastikbhattacharyya.projects.desiwanderer.image.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.dto.ImageMetadata;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.exception.ImageInvalidException;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
import javax.imageio.ImageIO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageFileService {

  private final Tika tika;

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

  public ImageMetadata extractMetadata(MultipartFile file) {
    String mimeType;

    try {
      mimeType = this.tika.detect(file.getInputStream());
    } catch (IOException ignored) {
      throw new ImageInvalidException();
    }

    try (InputStream is = file.getInputStream()) {
      BufferedImage image = ImageIO.read(is);
      if (image == null) throw new ImageInvalidException();
      return new ImageMetadata(image.getWidth(), image.getHeight(), mimeType);
    } catch (IOException ignored) {
      throw new ImageInvalidException();
    }
  }
}
