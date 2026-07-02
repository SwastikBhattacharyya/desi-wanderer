package in.co.swastikbhattacharyya.projects.desiwanderer.post.controller;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostReportModel;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostReportPayload;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostReport;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostReportCreateService;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostReportDeleteService;
import in.co.swastikbhattacharyya.projects.desiwanderer.validation.group.Create;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("post-reports")
@RequiredArgsConstructor
public class PostReportController {

  private final PostReportCreateService postReportCreateService;
  private final PostReportDeleteService postReportDeleteService;

  @PostMapping
  @PreAuthorize("hasAuthority('SCOPE_post_reports:write')")
  public ResponseEntity<PostReportModel> create(
      @RequestBody @Validated({Create.class}) PostReportPayload payload) {
    PostReport postReport = this.postReportCreateService.create(payload);
    return ResponseEntity.ok(PostReportModel.from(postReport));
  }

  @DeleteMapping("{id}")
  @PreAuthorize("hasAuthority('SCOPE_post_reports:write')")
  public ResponseEntity<PostReportModel> delete(@PathVariable UUID id) {
    PostReport postReport = this.postReportDeleteService.deleteById(id);
    return ResponseEntity.ok(PostReportModel.from(postReport));
  }
}
