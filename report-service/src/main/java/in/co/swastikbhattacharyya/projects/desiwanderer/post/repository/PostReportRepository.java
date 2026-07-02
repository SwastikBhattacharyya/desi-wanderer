package in.co.swastikbhattacharyya.projects.desiwanderer.post.repository;

import in.co.swastikbhattacharyya.projects.desiwanderer.post.entity.PostReport;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostReportRepository extends JpaRepository<PostReport, UUID> {

  Optional<PostReport> findByPost_Id(UUID postId);
}
