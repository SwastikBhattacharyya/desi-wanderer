package in.co.swastikbhattacharyya.projects.desiwanderer.image.controller;

import com.turkraft.springfilter.boot.Filter;
import com.turkraft.springfilter.boot.Pagination;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.dto.ImageModel;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.entity.ImageView;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.service.ImageDownloadService;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.service.ImageViewQueryService;
import in.co.swastikbhattacharyya.projects.desiwanderer.query.dto.PageResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

@RestController
@RequestMapping("images")
@RequiredArgsConstructor
public class ImageViewController {

  private final ImageViewQueryService imageViewQueryService;
  private final ImageDownloadService imageDownloadService;

  @GetMapping
  public PageResponse<ImageModel> findAll(
      @Filter Specification<ImageView> specification, @Pagination Pageable pageable) {
    return PageResponse.from(
        this.imageViewQueryService.findAll(specification, pageable).map(ImageModel::from));
  }

  @GetMapping("{id}")
  public ImageModel findById(@PathVariable UUID id) {
    return ImageModel.from(this.imageViewQueryService.findById(id));
  }

  @GetMapping("file/{id}")
  public ResponseEntity<Resource> download(@PathVariable UUID id) {
    ResponseInputStream<GetObjectResponse> stream = this.imageDownloadService.downloadById(id);
    return ResponseEntity.ok()
      .contentType(MediaType.parseMediaType(stream.response().contentType()))
      .contentLength(stream.response().contentLength())
      .body(new InputStreamResource(stream));
  }
}
