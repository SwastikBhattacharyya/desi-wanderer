package in.co.swastikbhattacharyya.projects.desiwanderer.image.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.application.property.S3Properties;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.entity.Image;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageS3Service {

  private final S3Client s3Client;
  private final S3Properties s3Properties;
  private final ImageFileService imageFileService;

  public ResponseInputStream<GetObjectResponse> download(Image image) {
    GetObjectRequest request =
        GetObjectRequest.builder()
            .bucket(this.s3Properties.bucket())
            .key(this.imageFileService.getFullKey(image.getKey(), image.getMimeType()))
            .build();
    return this.s3Client.getObject(request);
  }
}
