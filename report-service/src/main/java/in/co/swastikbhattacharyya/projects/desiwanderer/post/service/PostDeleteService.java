package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.repository.PostRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostDeleteService {

  private final PostRepository postRepository;
  private final PostQueryService postQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_posts:cdc")
  public void deleteById(UUID id) {
    Post post = this.postQueryService.findById(id);
    this.postRepository.delete(post);
    log.info("Post deleted: post={}", post);
  }

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_posts:cdc")
  public void deleteAll() {
    this.postRepository.deleteAllInBatch();
    log.info("Posts truncated");
  }
}
