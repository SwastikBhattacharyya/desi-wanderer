package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostReport;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.repository.PostReportRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostReportDeleteService {

  private final PostReportRepository postReportRepository;
  private final PostReportQueryService postReportQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_post_reports:cdc")
  public void deleteById(UUID id) {
    PostReport postReport = this.postReportQueryService.findById(id);
    this.postReportRepository.delete(postReport);
    log.info("Post Report deleted: report={}", postReport);
  }

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_post_reports:cdc")
  public void deleteAll() {
    this.postReportRepository.deleteAllInBatch();
    log.info("Post Reports truncated");
  }
}
