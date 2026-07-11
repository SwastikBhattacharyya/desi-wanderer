package in.co.swastikbhattacharyya.projects.desiwanderer.post.repository;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostView;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PostViewRepository
    extends JpaRepository<PostView, UUID>, JpaSpecificationExecutor<PostView> {

  Optional<PostView> findBySlug(String slug);
}
