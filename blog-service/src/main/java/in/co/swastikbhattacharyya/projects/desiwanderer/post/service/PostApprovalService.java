package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostReportEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostApprovalService {

  private final PostQueryService postQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_post_reports:cdc")
  public void create(PostReportEventValue event) {
    if (event.isOld() || !event.isApproved()) return;
    Post post = this.postQueryService.findById(event.postId());
    post.setIsApproved(true);
    log.info("Post approved: post={}", post);
  }
}
