package in.co.swastikbhattacharyya.projects.desiwanderer.comment.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.CommentView;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.exception.CommentNotFoundException;
import in.co.swastikbhattacharyya.projects.desiwanderer.comment.repository.CommentViewRepository;
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
public class CommentViewQueryService {

  private final CommentViewRepository commentViewRepository;

  @Transactional
  @InitializePostgresSession
  public Page<CommentView> findAll(Specification<CommentView> specification, Pageable pageable) {
    return this.commentViewRepository.findAll(specification, pageable);
  }

  @Transactional
  @InitializePostgresSession
  public CommentView findById(UUID id) {
    return this.commentViewRepository
        .findById(id)
        .orElseThrow(() -> new CommentNotFoundException(id));
  }
}
