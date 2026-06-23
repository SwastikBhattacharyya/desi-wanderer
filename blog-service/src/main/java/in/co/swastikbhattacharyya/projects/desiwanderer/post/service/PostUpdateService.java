package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostPayload;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.exception.PostDuplicateSlugException;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.repository.PostRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import jakarta.persistence.EntityManager;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostUpdateService {

  private final PostRepository postRepository;
  private final PostQueryService postQueryService;
  private final EntityManager entityManager;

  @Transactional
  @InitializePostgresSession
  public Post update(UUID id, PostPayload payload) {
    Post post = this.postQueryService.findById(id);

    payload
        .slug()
        .ifPresent(
            value -> {
              if (this.postRepository.existsByIdNotAndSlug(post.getId(), value))
                throw new PostDuplicateSlugException(value);
              post.setSlug(value);
            });
    payload.title().ifPresent(post::setTitle);
    payload.description().ifPresent(post::setDescription);
    payload.content().ifPresent(post::setContent);
    payload.isPublished().ifPresent(post::setIsPublished);
    payload.isApproved().ifPresent(post::setIsApproved);

    this.entityManager.flush();
    this.entityManager.refresh(post);

    log.info("Post updated: post={}", post);
    return post;
  }
}
