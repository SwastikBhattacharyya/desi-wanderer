package in.co.swastikbhattacharyya.projects.desiwanderer.comment.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.dto.CommentReportEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.CommentReport;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentReportUpdateService {

  private final CommentReportQueryService commentReportQueryService;
  private final CommentQueryService commentQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_post_reports:cdc")
  public void update(UUID id, CommentReportEventValue event) {
    CommentReport commentReport = this.commentReportQueryService.findById(id);

    if (commentReport.getLastProcessedLsn() > event.lsn()) return;

    commentReport.setIsApproved(event.isApproved());
    commentReport.setDisapprovalReason(event.disapprovalReason());
    commentReport.setLastProcessedLsn(event.lsn());
    commentReport.setComment(this.commentQueryService.findById(event.commentId()));
    commentReport.setCreatedAt(event.createdAt());
    commentReport.setUpdatedAt(event.updatedAt());

    log.info("Comment Report updated: report={}", commentReport);
  }
}
