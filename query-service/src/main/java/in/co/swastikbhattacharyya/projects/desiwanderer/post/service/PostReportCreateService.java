package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostReportEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostReport;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.repository.PostReportRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostReportCreateService {

  private final PostReportRepository postReportRepository;
  private final PostQueryService postQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_post_reports:cdc")
  public void create(PostReportEventValue event) {
    PostReport postReport =
        this.postReportRepository.save(
            PostReport.builder()
                .id(event.id())
                .languageReport(event.languageReport())
                .languageScore(event.languageScore())
                .relevanceReport(event.relevanceReport())
                .relevanceScore(event.relevanceScore())
                .vulgarityReport(event.vulgarityReport())
                .vulgarityScore(event.vulgarityScore())
                .overallReport(event.overallReport())
                .overallScore(event.overallScore())
                .isApproved(event.isApproved())
                .isOld(event.isOld())
                .lastProcessedLsn(event.lsn())
                .post(this.postQueryService.findById(event.postId()))
                .createdAt(event.createdAt())
                .updatedAt(event.updatedAt())
                .build());
    log.info("Post Report created: report={}", postReport);
  }
}
