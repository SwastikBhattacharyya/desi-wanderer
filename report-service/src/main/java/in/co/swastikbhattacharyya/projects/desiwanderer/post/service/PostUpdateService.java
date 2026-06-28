package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.service.UserQueryService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostUpdateService {

  private final PostQueryService postQueryService;
  private final UserQueryService userQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_posts:cdc")
  public void update(UUID id, PostEventValue event) {
    Post post = this.postQueryService.findById(id);

    if (post.getLastProcessedLsn() > event.lsn()) return;

    post.setSlug(event.slug());
    post.setTitle(event.title());
    post.setDescription(event.description());
    post.setContent(event.content());
    post.setIsPublished(event.isPublished());
    post.setIsApproved(event.isApproved());
    post.setAuthor(this.userQueryService.findById(event.authorId()));
    post.setLastProcessedLsn(event.lsn());
    log.info("Post updated: post={}", post);
  }
}
