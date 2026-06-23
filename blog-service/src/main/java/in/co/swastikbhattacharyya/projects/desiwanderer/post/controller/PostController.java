package in.co.swastikbhattacharyya.projects.desiwanderer.post.controller;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostModel;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostPayload;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostCreateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostDeleteService;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostUpdateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Create;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Patch;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Update;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("posts")
@RequiredArgsConstructor
public class PostController {

  private final PostCreateService postCreateService;
  private final PostUpdateService postUpdateService;
  private final PostDeleteService postDeleteService;

  @PostMapping
  @PreAuthorize("hasAuthority('SCOPE_posts:write')")
  public ResponseEntity<PostModel> create(
      @RequestBody @Validated({Create.class}) PostPayload payload) {
    Post post = this.postCreateService.create(payload);
    return ResponseEntity.status(HttpStatus.CREATED).body(PostModel.from(post));
  }

  @PutMapping("{id}")
  @PreAuthorize("hasAnyAuthority('SCOPE_posts:write', 'SCOPE_posts:approve')")
  public ResponseEntity<PostModel> update(
      @PathVariable UUID id, @RequestBody @Validated({Update.class}) PostPayload payload) {
    Post post = this.postUpdateService.update(id, payload);
    return ResponseEntity.ok(PostModel.from(post));
  }

  @PatchMapping("{id}")
  @PreAuthorize("hasAnyAuthority('SCOPE_posts:write', 'SCOPE_posts:approve')")
  public ResponseEntity<PostModel> patch(
      @PathVariable UUID id, @RequestBody @Validated({Patch.class}) PostPayload payload) {
    Post post = this.postUpdateService.update(id, payload);
    return ResponseEntity.ok(PostModel.from(post));
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasAuthority('SCOPE_posts:write')")
  public ResponseEntity<PostModel> delete(@PathVariable UUID id) {
    Post post = this.postDeleteService.deleteById(id);
    return ResponseEntity.ok(PostModel.from(post));
  }
}
