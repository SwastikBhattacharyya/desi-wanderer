package in.co.swastikbhattacharyya.projects.desiwanderer.post.service;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.Post;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.exception.PostNotFoundException;
import in.co.swastikbhattacharyya.projects.desiwanderer.post.repository.PostRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostQueryService {

  private final PostRepository postRepository;

  public Post findById(UUID id) {
    return this.postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
  }
}
