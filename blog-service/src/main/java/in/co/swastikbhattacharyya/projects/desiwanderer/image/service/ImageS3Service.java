package in.co.swastikbhattacharyya.projects.desiwanderer.image.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.application.property.S3Properties;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.entity.Image;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.exception.ImageInvalidException;
import java.io.IOException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

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

  public void upload(MultipartFile file, UUID key, String mimeType) {
    PutObjectRequest request =
        PutObjectRequest.builder()
            .bucket(this.s3Properties.bucket())
            .key(this.imageFileService.getFullKey(key, mimeType))
            .contentType(mimeType)
            .build();

    try {
      byte[] bytes = file.getBytes();
      this.s3Client.putObject(request, RequestBody.fromBytes(bytes));
    } catch (IOException ignored) {
      throw new ImageInvalidException();
    }
  }

  public void deleteFromS3(Image image) {
    DeleteObjectRequest request =
        DeleteObjectRequest.builder()
            .bucket(this.s3Properties.bucket())
            .key(this.imageFileService.getFullKey(image.getKey(), image.getMimeType()))
            .build();

    this.s3Client.deleteObject(request);
  }
}
