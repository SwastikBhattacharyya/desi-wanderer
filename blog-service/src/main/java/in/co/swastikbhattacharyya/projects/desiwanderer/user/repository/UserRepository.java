package in.co.swastikbhattacharyya.projects.desiwanderer.user.repository;

import in.co.swastikbhattacharyya.projects.desiwanderer.user.entity.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {}
