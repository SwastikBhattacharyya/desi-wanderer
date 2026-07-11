package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostReportView;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.exception.PostReportNotFoundException;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.repository.PostReportViewRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostReportViewQueryService {

  private final PostReportViewRepository postReportViewRepository;

  @Transactional
  @InitializePostgresSession
  public Page<PostReportView> findAll(
      Specification<PostReportView> specification, Pageable pageable) {
    return this.postReportViewRepository.findAll(specification, pageable);
  }

  @Transactional
  @InitializePostgresSession
  public PostReportView findById(UUID id) {
    return this.postReportViewRepository
        .findById(id)
        .orElseThrow(() -> new PostReportNotFoundException(id));
  }
}
