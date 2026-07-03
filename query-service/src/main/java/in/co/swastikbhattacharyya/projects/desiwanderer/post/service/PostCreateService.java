package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.dto.PostEventValue;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.repository.PostRepository;
import in.co.swastikbhattacharyya.projects.desiwanderer.postgres.session.annotation.InitializePostgresSession;
import in.co.swastikbhattacharyya.projects.desiwanderer.user.service.UserQueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostCreateService {

  private final PostRepository postRepository;
  private final UserQueryService userQueryService;

  @Transactional
  @InitializePostgresSession(additionalAuthorities = "SCOPE_posts:cdc")
  public void create(PostEventValue event) {
    Post post =
        this.postRepository.save(
            Post.builder()
                .id(event.id())
                .slug(event.slug())
                .title(event.title())
                .description(event.description())
                .content(event.content())
                .isPublished(event.isPublished())
                .isApproved(event.isApproved())
                .lastProcessedLsn(event.lsn())
                .author(this.userQueryService.findById(event.authorId()))
                .createdAt(event.createdAt())
                .updatedAt(event.updatedAt())
                .build());
    log.info("Post created: post={}", post);
  }
}
