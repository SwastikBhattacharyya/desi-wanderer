package in.co.swastikbhattacharyya.projects.desiwanderer.comment.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentPayload;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.Comment;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.repository.CommentRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostQueryService;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.service.UserQueryService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentCreateService {

  private final CommentRepository commentRepository;
  private final PostQueryService postQueryService;
  private final UserQueryService userQueryService;
  private final EntityManager entityManager;

  @Transactional
  @InitializePostgresSession
  public Comment create(CommentPayload payload) {
    Post post = this.postQueryService.findById(payload.postId().get());

    Comment comment =
        this.commentRepository.save(
            Comment.builder()
                .content(payload.content().get())
                .isApproved(payload.isApproved().get())
                .post(post)
                .author(this.userQueryService.findByAuthentication())
                .build());

    this.entityManager.flush();
    this.entityManager.refresh(post);

    log.info("Comment created: comment={}", comment);
    return comment;
  }
}
