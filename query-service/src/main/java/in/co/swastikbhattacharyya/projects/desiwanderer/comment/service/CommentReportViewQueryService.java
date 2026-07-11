package in.co.swastikbhattacharyya.projects.desiwanderer.comment.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.CommentReportView;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.exception.CommentReportNotFoundException;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.repository.CommentReportViewRepository;
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
public class CommentReportViewQueryService {

  private final CommentReportViewRepository commentReportViewRepository;

  @Transactional
  @InitializePostgresSession
  public Page<CommentReportView> findAll(
      Specification<CommentReportView> specification, Pageable pageable) {
    return this.commentReportViewRepository.findAll(specification, pageable);
  }

  @Transactional
  @InitializePostgresSession
  public CommentReportView findById(UUID id) {
    return this.commentReportViewRepository
        .findById(id)
        .orElseThrow(() -> new CommentReportNotFoundException(id));
  }
}
