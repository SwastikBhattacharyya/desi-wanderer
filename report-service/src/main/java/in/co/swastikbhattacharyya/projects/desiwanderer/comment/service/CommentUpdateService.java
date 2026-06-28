package in.co.swastikbhattacharyya.projects.desiwanderer.comment.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.Comment;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostQueryService;
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
public class CommentUpdateService {

  private final CommentQueryService commentQueryService;
  private final UserQueryService userQueryService;
  private final PostQueryService postQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = {"SCOPE_comments:cdc", "SCOPE_posts:read:any"})
  public void update(UUID id, CommentEventValue event) {
    Comment comment = this.commentQueryService.findById(id);

    if (comment.getLastProcessedLsn() > event.lsn()) return;

    comment.setContent(event.content());
    comment.setIsApproved(event.isApproved());
    comment.setAuthor(this.userQueryService.findById(event.authorId()));
    comment.setPost(this.postQueryService.findById(event.postId()));
    comment.setLastProcessedLsn(event.lsn());
    log.info("Updated comment: comment={}", comment);
  }
}
