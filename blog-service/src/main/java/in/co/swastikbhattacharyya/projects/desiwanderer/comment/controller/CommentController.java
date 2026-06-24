package in.co.swastikbhattacharyya.projects.desiwanderer.comment.controller;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentModel;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentPayload;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.Comment;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.service.CommentCreateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.service.CommentDeleteService;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.service.CommentUpdateService;
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
@RequestMapping("comments")
@RequiredArgsConstructor
public class CommentController {

  private final CommentCreateService commentCreateService;
  private final CommentUpdateService commentUpdateService;
  private final CommentDeleteService commentDeleteService;

  @PostMapping
  @PreAuthorize("hasAuthority('SCOPE_comments:write')")
  public ResponseEntity<CommentModel> create(
      @RequestBody @Validated({Create.class}) CommentPayload payload) {
    Comment comment = this.commentCreateService.create(payload);
    return ResponseEntity.status(HttpStatus.CREATED).body(CommentModel.from(comment));
  }

  @PutMapping("{id}")
  @PreAuthorize("hasAnyAuthority('SCOPE_comments:write', 'SCOPE_comments:approve')")
  public ResponseEntity<CommentModel> update(
      @PathVariable UUID id, @RequestBody @Validated({Update.class}) CommentPayload payload) {
    Comment comment = this.commentUpdateService.update(id, payload);
    return ResponseEntity.ok(CommentModel.from(comment));
  }

  @PatchMapping("{id}")
  @PreAuthorize("hasAnyAuthority('SCOPE_comments:write', 'SCOPE_comments:approve')")
  public ResponseEntity<CommentModel> patch(
      @PathVariable UUID id, @RequestBody @Validated({Patch.class}) CommentPayload payload) {
    Comment comment = this.commentUpdateService.update(id, payload);
    return ResponseEntity.ok(CommentModel.from(comment));
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasAuthority('SCOPE_comments:write')")
  public ResponseEntity<CommentModel> delete(@PathVariable UUID id) {
    Comment comment = this.commentDeleteService.deleteById(id);
    return ResponseEntity.ok(CommentModel.from(comment));
  }
}
