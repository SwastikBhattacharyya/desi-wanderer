package in.co.swastikbhattacharyya.projects.desiwanderer.comment.repository;

import in.co.swastikbhattacharyya.projects.desiwanderer.comment.entity.Comment;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository
    extends JpaRepository<Comment, UUID> {}
