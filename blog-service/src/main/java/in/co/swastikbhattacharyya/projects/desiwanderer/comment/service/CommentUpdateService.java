package in.co.swastikbhattacharyya.projects.desiwanderer.comment.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentPayload;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.Comment;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.service.PostQueryService;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import jakarta.persistence.EntityManager;
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
  private final PostQueryService postQueryService;
  private final EntityManager entityManager;

  @Transactional
  @InitializePostgresSession
  public Comment update(UUID id, CommentPayload payload) {
    Comment comment = this.commentQueryService.findById(id);

    payload
        .postId()
        .ifPresent(
            value -> {
              Post post = this.postQueryService.findById(value);
              comment.setPost(post);
            });
    payload.content().ifPresent(comment::setContent);
    payload.isApproved().ifPresent(comment::setIsApproved);

    this.entityManager.flush();
    this.entityManager.refresh(comment);

    log.info("Comment updated: comment={}", comment);
    return comment;
  }
}
