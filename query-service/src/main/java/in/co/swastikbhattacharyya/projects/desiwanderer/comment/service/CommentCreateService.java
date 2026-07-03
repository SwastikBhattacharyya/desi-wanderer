package in.co.swastikbhattacharyya.projects.desiwanderer.comment.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.Comment;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.repository.CommentRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostQueryService;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.service.UserQueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentCreateService {

  private final CommentRepository commentRepository;
  private final UserQueryService userQueryService;
  private final PostQueryService postQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = {"SCOPE_comments:cdc", "SCOPE_posts:read:any"})
  public void create(CommentEventValue event) {
    Comment comment =
        this.commentRepository.save(
            Comment.builder()
                .id(event.id())
                .content(event.content())
                .isApproved(event.isApproved())
                .lastProcessedLsn(event.lsn())
                .author(this.userQueryService.findById(event.authorId()))
                .post(this.postQueryService.findById(event.postId()))
                .createdAt(event.createdAt())
                .updatedAt(event.updatedAt())
                .build());
    log.info("Created comment: comment={}", comment);
  }
}
