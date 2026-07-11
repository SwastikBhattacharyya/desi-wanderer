package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostView;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.exception.PostNotFoundException;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.repository.PostViewRepository;
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
public class PostViewQueryService {

  private final PostViewRepository postViewRepository;

  @Transactional
  @InitializePostgresSession
  public Page<PostView> findAll(Specification<PostView> specification, Pageable pageable) {
    return this.postViewRepository.findAll(specification, pageable);
  }

  @Transactional
  @InitializePostgresSession
  public PostView findByKey(String key) {
    try {
      UUID id = UUID.fromString(key);
      return this.postViewRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
    } catch (Exception ignored) {
      return this.postViewRepository
          .findBySlug(key)
          .orElseThrow(() -> new PostNotFoundException(key));
    }
  }
}
