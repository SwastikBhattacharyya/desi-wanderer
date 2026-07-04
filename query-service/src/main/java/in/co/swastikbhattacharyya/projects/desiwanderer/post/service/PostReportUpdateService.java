package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostReportEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostReport;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostReportUpdateService {

  private final PostReportQueryService postReportQueryService;
  private final PostQueryService postQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_post_reports:cdc")
  public void update(UUID id, PostReportEventValue event) {
    PostReport postReport = this.postReportQueryService.findById(id);

    if (postReport.getLastProcessedLsn() > event.lsn()) return;

    postReport.setLanguageReport(event.languageReport());
    postReport.setLanguageScore(event.languageScore());
    postReport.setRelevanceReport(event.relevanceReport());
    postReport.setLanguageScore(event.relevanceScore());
    postReport.setVulgarityReport(event.vulgarityReport());
    postReport.setVulgarityScore(event.vulgarityScore());
    postReport.setOverallReport(event.overallReport());
    postReport.setOverallScore(event.overallScore());
    postReport.setIsApproved(event.isApproved());
    postReport.setIsOld(event.isOld());
    postReport.setLastProcessedLsn(event.lsn());
    postReport.setPost(this.postQueryService.findById(event.postId()));
    postReport.setCreatedAt(event.createdAt());
    postReport.setUpdatedAt(event.updatedAt());

    log.info("Post Report updated: report={}", postReport);
  }
}
