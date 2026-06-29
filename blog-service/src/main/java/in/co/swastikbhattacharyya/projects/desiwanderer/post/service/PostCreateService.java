package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.image.service.ImageQueryService;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostPayload;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.exception.PostDuplicateSlugException;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.repository.PostRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.service.UserQueryService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostCreateService {

  private final PostRepository postRepository;
  private final UserQueryService userQueryService;
  private final ImageQueryService imageQueryService;
  private final EntityManager entityManager;

  @Transactional
  @InitializePostgresSession
  public Post create(PostPayload payload) {
    if (this.postRepository.existsBySlug(payload.slug().get()))
      throw new PostDuplicateSlugException(payload.slug().get());

    Post post =
        this.postRepository.save(
            Post.builder()
                .slug(payload.slug().get())
                .title(payload.title().get())
                .description(payload.description().get())
                .content(payload.content().get())
                .isPublished(payload.isPublished().get())
                .isApproved(payload.isApproved().get())
                .author(this.userQueryService.findByAuthentication())
                .build());

    payload
        .imageId()
        .ifPresent(
            value -> {
              if (value == null) return;
              post.setImage(this.imageQueryService.findById(value));
            });

    this.entityManager.flush();
    this.entityManager.refresh(post);

    log.info("Post created: post={}", post);
    return post;
  }
}
