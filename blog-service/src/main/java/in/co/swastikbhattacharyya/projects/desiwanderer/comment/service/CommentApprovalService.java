package in.co.swastikbhattacharyya.projects.desiwanderer.comment.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentReportEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.Comment;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentApprovalService {

  private final CommentQueryService commentQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_comment_reports:cdc")
  public void create(CommentReportEventValue value) {
    if (!value.isApproved()) return;
    Comment comment = this.commentQueryService.findById(value.commentId());
    comment.setIsApproved(true);
    log.info("Comment approved: comment={}", comment);
  }
}
