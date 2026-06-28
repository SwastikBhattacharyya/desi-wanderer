package in.co.swastikbhattacharyya.projects.desiwanderer.comment.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.Comment;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.repository.CommentRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentDeleteService {

  private final CommentRepository commentRepository;
  private final CommentQueryService commentQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_comments:cdc")
  public void deleteById(UUID id) {
    Comment comment = this.commentQueryService.findById(id);
    this.commentRepository.delete(comment);
    log.info("Deleted comment: comment={}", comment);
  }

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_comments:cdc")
  public void deleteAll() {
    this.commentRepository.deleteAll();
    log.info("Comments truncated");
  }
}
