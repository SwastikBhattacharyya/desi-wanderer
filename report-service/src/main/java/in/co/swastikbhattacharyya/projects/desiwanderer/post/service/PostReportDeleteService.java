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
@RequiredArgsConstructor
@Slf4j
public class PostReportDeleteService {

  private final PostReportRepository postReportRepository;
  private final PostReportQueryService postReportQueryService;

  @Transactional
  @InitializePostgresSession
  public PostReport deleteById(UUID id) {
    PostReport postReport = this.postReportQueryService.findById(id);
    this.postReportRepository.delete(postReport);
    log.info("Post Report deleted: report={}", postReport);
    return postReport;
  }
}
