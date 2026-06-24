package in.co.swastikbhattacharyya.projects.desiwanderer.image.controller;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.dto.ImageModel;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.dto.ImagePayload;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.dto.ImageUploadPayload;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.entity.Image;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.service.ImageCreateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.service.ImageDeleteService;
import in.co.swastikbhattacharyya.projects.desiwanderer.image.service.ImageUpdateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Patch;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Update;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("images")
@RequiredArgsConstructor
public class ImageController {

  private final ImageCreateService imageCreateService;
  private final ImageUpdateService imageUpdateService;
  private final ImageDeleteService imageDeleteService;

  @PostMapping(consumes = "multipart/form-data")
  @PreAuthorize("hasAuthority('SCOPE_images:write')")
  public ResponseEntity<ImageModel> create(@ModelAttribute ImageUploadPayload imageUploadPayload) {
    Image image = this.imageCreateService.create(imageUploadPayload);
    return ResponseEntity.status(HttpStatus.CREATED).body(ImageModel.from(image));
  }

  @PutMapping("{id}")
  @PreAuthorize("hasAuthority('SCOPE_images:write')")
  public ResponseEntity<ImageModel> update(
      @PathVariable UUID id, @RequestBody @Validated({Update.class}) ImagePayload payload) {
    Image image = this.imageUpdateService.update(id, payload);
    return ResponseEntity.ok(ImageModel.from(image));
  }

  @PatchMapping("{id}")
  @PreAuthorize("hasAuthority('SCOPE_images:write')")
  public ResponseEntity<ImageModel> patch(
      @PathVariable UUID id, @RequestBody @Validated({Patch.class}) ImagePayload payload) {
    Image image = this.imageUpdateService.update(id, payload);
    return ResponseEntity.ok(ImageModel.from(image));
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasAuthority('SCOPE_images:write')")
  public ResponseEntity<ImageModel> delete(@PathVariable UUID id) {
    Image image = this.imageDeleteService.deleteById(id);
    return ResponseEntity.ok(ImageModel.from(image));
  }
}
